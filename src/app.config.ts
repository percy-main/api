import { buildConfig } from "./lib/config";

export const APP_CONFIG = Symbol("APP_CONFIG");

export const appConfig = buildConfig((b) => ({
  port: b.required("PORT", {
    coerce: b.coerce.number,
    validate: b.validate.number,
  }),
}))();
