import { compact } from "lodash";
import dd from "pino-datadog";
import pino from "pino-multi-stream";
import { logConfig } from "./log.config";
import { Logger } from "./logger.types";

const addContext = () => {
  return {
    environment: process.env.NODE_ENV,
    deploymentEnvironment: process.env.DEPLOYMENT_ENV,
  };
};

const { datadogApiKey } = logConfig();

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
        streams: compact([
          { stream: process.stdout },
          datadogApiKey && {
            stream: dd.createWriteStreamSync({
              apiKey: datadogApiKey,
              eu: true,
              service: "api",
            }),
          },
        ]),
      });
    }
    return this.logger;
  }
}
