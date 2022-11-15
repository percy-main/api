import { SetMetadata } from "@nestjs/common";

export const IS_REQUEST_LOGGING_DISABLED = Symbol(
  "IS_REQUEST_LOGGING_DISABLED",
);

export const NoRequestLogs = () =>
  SetMetadata(IS_REQUEST_LOGGING_DISABLED, true);
