import { createLogger, Logger, transports, format } from "winston";

export class BaseLogger {
  private static logger: Logger;

  static getLogger() {
    if (!this.logger) {
      this.logger = createLogger({
        transports: [new transports.Console({ format: format.json() })],
      });
    }
    return this.logger;
  }
}
