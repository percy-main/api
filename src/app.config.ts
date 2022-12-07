import { buildConfig } from "./lib/config";

export const APP_CONFIG = Symbol("APP_CONFIG");

export const appConfig = buildConfig((b) => ({
  port: b.required("PORT", {
    coerce: b.coerce.number,
    validate: b.validate.number,
  }),
  corsAllowedDomains: b.required("CORS_ALLOWED_DOMAINS", {
    coerce: (s) => s.split(","),
  }),
  devMode: b.optional("DEV_MODE", {
    coerce: b.coerce.bool,
  }),
}))();
