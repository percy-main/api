import { LogCtx, Logger } from "./logger.types";

export class NestLoggerAdapter {
  constructor(private logger: Logger) {}

  public log = this.wrapLogger("info");
  public error = this.wrapLogger("error");
  public warn = this.wrapLogger("warn");
  public debug = this.wrapLogger("debug");
  public verbose = this.wrapLogger("trace");

  wrapLogger(level: keyof Logger) {
    return (msg: string, ...ctx: unknown[]) => {
      this.logger[level](
        ctx.reduce(
          (o: LogCtx, c, i) => ({
            ...o,
            ...(typeof c === "object"
              ? c
              : c instanceof Error
              ? { err: c }
              : { [`extra-${i}`]: c }),
          }),
          {},
        ) as LogCtx,
        msg,
      );
    };
  }
}
