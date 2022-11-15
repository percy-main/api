import { Injectable } from "@nestjs/common";
import { LogService } from "../../log.service";

@Injectable()
export class MockLogService {
  addCtx = jest.fn();
  info = jest.fn();
  error = jest.fn();
  warn = jest.fn();
  debug = jest.fn();

  static asLogService() {
    return new MockLogService() as unknown as LogService;
  }
}
