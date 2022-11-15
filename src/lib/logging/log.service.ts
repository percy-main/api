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
    this.logger.info(msg, { ...this.ctx, ...ctx });
  }

  error(msg: string, ctx?: Record<string, unknown>) {
    this.logger.error(msg, { ...this.ctx, ...ctx });
  }

  warn(msg: string, ctx?: Record<string, unknown>) {
    this.logger.warn(msg, { ...this.ctx, ...ctx });
  }

  debug(msg: string, ctx?: Record<string, unknown>) {
    if (this.logger.isDebugEnabled()) {
      this.logger.debug(msg, { ...this.ctx, ...ctx });
    }
  }

  addCtx(ctx: Record<string, unknown>) {
    this.logger.info("log context added", ctx);
  }

  log = this.info.bind(this);

  child(ctx: Record<string, unknown>) {
    const logger = new LogService();
    logger.ctx = ctx;
    return logger;
  }
}
