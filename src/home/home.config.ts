import { buildConfig, Config } from "../lib/config";

export const HOME_CONFIG = Symbol("HOME_CONFIG");

export const homeConfig = buildConfig((b) => ({
  greeting: b.required("GREETING"),
}));

export type HomeConfig = Config<typeof homeConfig>;
