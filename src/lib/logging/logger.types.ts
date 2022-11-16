export type LogCtx =
  | (Record<Exclude<string, "msg" | "err">, unknown> &
      Partial<Record<"err", unknown>>)
  | Error;

export type LogFnStr = (msg: string) => void;
export type LogFnCtx = (ctx: LogCtx, msg: string) => void;
export type LogFn = LogFnStr & LogFnCtx;

export type Logger = {
  debug: LogFn;
  trace: LogFn;
  info: LogFn;
  warn: LogFn;
  error: LogFn;
  fatal: LogFn;
  child: (ctx: LogCtx) => Logger;
};
