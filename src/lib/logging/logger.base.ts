import pino from "pino";
import { Logger } from "./logger.types";

const addContext = () => {
  return {
    environment: process.env.NODE_ENV,
    deploymentEnvironment: process.env.DEPLOYMENT_ENV,
  };
};

export class BaseLogger {
  private static logger: Logger;

  static getLogger() {
    if (!this.logger) {
      this.logger = pino({
        formatters: {
          level: (level) => ({ level }),
        },
        level: process.env.LOG_LEVEL || "info",
        mixin: addContext,
      });
    }
    return this.logger;
  }
}
