import { Injectable, Scope } from "@nestjs/common";
import { BaseLogger } from "./logger.base";
import { Logger } from "./logger.types";

@Injectable({ scope: Scope.REQUEST })
export class LogService {
  private logger: Logger;
  protected ctx = {};

  constructor() {
    this.logger = BaseLogger.getLogger().child({});
  }

  info(msg: string, ctx?: Record<string, unknown>) {
    this.logger.info({ ...this.ctx, ...ctx }, msg);
  }

  error(msg: string, ctx?: Record<string, unknown>) {
    this.logger.error({ ...this.ctx, ...ctx }, msg);
  }

  warn(msg: string, ctx?: Record<string, unknown>) {
    this.logger.warn({ ...this.ctx, ...ctx }, msg);
  }

  debug(msg: string, ctx?: Record<string, unknown>) {
    this.logger.debug({ ...this.ctx, ...ctx }, msg);
  }

  addCtx(ctx: Record<string, unknown>) {
    this.logger.info(ctx, "log context added");
  }

  log = this.info.bind(this);

  child(ctx: Record<string, unknown>) {
    const logger = new LogService();
    logger.ctx = ctx;
    return logger;
  }
}
