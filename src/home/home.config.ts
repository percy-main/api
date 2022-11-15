import { buildConfig, Config } from "../lib/config";

export const homeConfig = buildConfig((b) => ({
  greeting: b.required("GREETING"),
}));

export type HomeConfig = Config<typeof homeConfig>;
