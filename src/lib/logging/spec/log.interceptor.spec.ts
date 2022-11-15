import { CallHandler, ExecutionContext } from "@nestjs/common";
import { HTTP_CODE_METADATA } from "@nestjs/common/constants";
import { Reflector } from "@nestjs/core";
import { Observable, of } from "rxjs";
import { LogInterceptor } from "../log.interceptor";
import { MockLogService } from "./fixtures/log.fixture";

const getFixtures = () => {
  const logger = MockLogService.asLogService();

  const reflector = {
    get: jest.fn((key, target) => `${key}_${target.name}`),
    getAllAndOverride: jest.fn(() => undefined),
  } as unknown as Reflector;

  const interceptor = new LogInterceptor(logger, reflector);

  const request = {
    url: "test_url",
    method: "test_method",
    ip: "test_ip",
    originalUrl: "test_original_url",
    headers: {
      ["x-forwarded-for"]: "ip1, ip2",
    },
  };

  const context = {
    getHandler: jest.fn().mockReturnValue({ name: "test_handler" }),
    getClass: jest.fn().mockReturnValue({ name: "test_controller" }),
    switchToHttp: jest.fn().mockReturnValue({
      getRequest: jest.fn().mockReturnValue(request),
    }),
  } as unknown as ExecutionContext;

  const successfulCallHandler: CallHandler = {
    handle: jest.fn().mockReturnValue(of([])),
  };

  const erroringCallHandler: CallHandler = {
    handle: jest
      .fn()
      .mockReturnValue(new Observable((o) => o.error("test_error"))),
  };

  return {
    logger,
    reflector,
    interceptor,
    context,
    successfulCallHandler,
    erroringCallHandler,
    request,
  };
};

describe("log interceptor", () => {
  it("logs a request started message with request context", () => {
    return new Promise<void>((done) => {
      const { logger, interceptor, successfulCallHandler, context, request } =
        getFixtures();

      interceptor.intercept(context, successfulCallHandler).subscribe({
        complete: () => {
          expect(logger.info).toBeCalledWith("Request started", {
            url: request.url,
            ip: request.ip,
            clientIps: ["ip1", "ip2"],
            originalUrl: request.originalUrl,
          });
          done();
        },
      });
    });
  });

  it("logs a request success message with status code and tookMs", () => {
    return new Promise<void>((done) => {
      const { logger, interceptor, successfulCallHandler, context } =
        getFixtures();

      interceptor.intercept(context, successfulCallHandler).subscribe({
        complete: () => {
          expect(logger.info).toBeCalledWith("Request succeeded", {
            statusCode: `${HTTP_CODE_METADATA}_test_handler`,
            tookMs: expect.any(Number),
          });
          done();
        },
      });
    });
  });

  it("logs a request error message with error, status code and tookMs", () => {
    return new Promise<void>((done) => {
      const { logger, interceptor, erroringCallHandler, context } =
        getFixtures();

      interceptor.intercept(context, erroringCallHandler).subscribe({
        error: () => {
          expect(logger.error).toBeCalledWith("Request failed", {
            err: "test_error",
            statusCode: 500,
            tookMs: expect.any(Number),
          });
          done();
        },
      });
    });
  });

  it("adds request context to logger", () => {
    return new Promise<void>((done) => {
      const { logger, interceptor, successfulCallHandler, context } =
        getFixtures();

      interceptor.intercept(context, successfulCallHandler).subscribe({
        complete: () => {
          expect(logger.addCtx).toBeCalledWith(
            expect.objectContaining({
              controller: "test_controller",
              handler: "test_handler",
              path: "/path_test_controller/path_test_handler",
              method: "test_method",
            }),
          );
          done();
        },
      });
    });
  });

  it("does not log when @NoRequestLogs is used", () => {
    return new Promise<void>((done) => {
      const { logger, interceptor, successfulCallHandler, context, reflector } =
        getFixtures();
      reflector.getAllAndOverride = jest.fn().mockReturnValue(true);

      interceptor.intercept(context, successfulCallHandler).subscribe({
        complete: () => {
          expect(logger.info).toBeCalledTimes(0);
          done();
        },
      });
    });
  });
});
