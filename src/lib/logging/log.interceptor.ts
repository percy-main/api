import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NestInterceptor,
  Scope,
} from "@nestjs/common";
import { HTTP_CODE_METADATA, PATH_METADATA } from "@nestjs/common/constants";
import { Reflector } from "@nestjs/core";
import { Request } from "express";
import { catchError, tap } from "rxjs/operators";
import { LogService } from "./log.service";
import { IS_REQUEST_LOGGING_DISABLED } from "./logger.decorator";

const NS_PER_SEC = 1e9;
const NS_PER_MS = 1e6;

const stripLeadingAndTrailing =
  (char: string) => (input: string | undefined) => {
    if (!input) {
      return input;
    }
    const subStart = input.startsWith(char) ? 1 : 0;
    const subEnd = input.endsWith(char) ? input.length - 1 : input.length;

    return input.substr(subStart, subEnd - subStart);
  };

@Injectable({ scope: Scope.REQUEST })
export class LogInterceptor implements NestInterceptor {
  constructor(
    private readonly logger: LogService,
    private reflector: Reflector,
  ) {}

  private getElapsedMs(startTime: [number, number]) {
    const [seconds, nanoseconds] = process.hrtime(startTime);
    return (seconds * NS_PER_SEC + nanoseconds) / NS_PER_MS;
  }

  /**
   * Nest doesn't require/add leading or trailing slashes on paths, but does default to
   * a slash where a path is not provided. I.e.
   *
   * @InterceptedController() -> "/"
   * @InterceptedController("properties") -> "properties"
   *
   * This method normalises the controller and method parts of the path, so that the resulting
   * combined path matches that from the incoming express request
   */
  private formatPath(...paths: string[]) {
    const fullPath = paths
      .map(stripLeadingAndTrailing("/"))
      .filter((path) => path && path.length > 0)
      .join("/");

    return `/${fullPath}`;
  }

  private shouldLogRequest(context: ExecutionContext) {
    const requestLogsDisabled = this.reflector.getAllAndOverride(
      IS_REQUEST_LOGGING_DISABLED,
      [context.getClass(), context.getHandler()],
    );

    return !requestLogsDisabled;
  }

  private onRequestStarted(context: ExecutionContext) {
    const controller = context.getClass();
    const handler = context.getHandler();
    const controllerPath = this.reflector.get(PATH_METADATA, controller);
    const methodPath = this.reflector.get(PATH_METADATA, handler);

    const expressReq = context.switchToHttp().getRequest<Request>();

    const { url, method, ip, originalUrl, headers } = expressReq;

    const forwardedHeader = headers["x-forwarded-for"];

    const clientIps = Array.isArray(forwardedHeader)
      ? forwardedHeader
      : forwardedHeader?.split(", ");

    this.logger.addCtx({
      controller: controller.name,
      handler: handler.name,
      path: this.formatPath(controllerPath, methodPath),
      method,
    });

    this.logger.info("Request started", {
      url,
      ip,
      clientIps,
      originalUrl,
    });
  }

  private onRequestError(
    _context: ExecutionContext,
    startTime: [number, number],
    err: unknown,
  ): never {
    if (err instanceof HttpException) {
      /**
       * Using info not error, as otherwise all 4xx errors would be logged at a
       * high severity. The error itself is not logged, as an HttpException is likely
       * to have been thrown intentionally, rather than being accidentally uncaught
       * within a request handler.
       */
      this.logger.info("Request failed", {
        statusCode: err.getStatus(),
        tookMs: this.getElapsedMs(startTime),
      });
      throw err;
    } else {
      this.logger.error("Request failed", {
        err,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        tookMs: this.getElapsedMs(startTime),
      });
      throw new InternalServerErrorException();
    }
  }

  private onRequestSuccess(
    context: ExecutionContext,
    startTime: [number, number],
  ) {
    const successfulStatusCode = this.reflector.get(
      HTTP_CODE_METADATA,
      context.getHandler(),
    );
    this.logger.info("Request succeeded", {
      statusCode: successfulStatusCode || HttpStatus.OK,
      tookMs: this.getElapsedMs(startTime),
    });
  }

  intercept(context: ExecutionContext, next: CallHandler) {
    const startTime = process.hrtime();

    if (!this.shouldLogRequest(context)) {
      return next.handle();
    }

    this.onRequestStarted(context);

    return next.handle().pipe(
      catchError((err) => this.onRequestError(context, startTime, err)),
      tap(() => this.onRequestSuccess(context, startTime)),
    );
  }
}
