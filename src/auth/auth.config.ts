import { buildConfig, Config } from "../lib/config";

export const AUTH_CONFIG = Symbol("AUTH_CONFIG");

export const authConfig = buildConfig((b) => ({
  jwksUri: b.required("JWKS_URI"),
  authDisabled: b.required("AUTH_DISABLED", {
    coerce: (val) => val === "true",
  }),
}));

export type AuthConfig = Config<typeof authConfig>;
