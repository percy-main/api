import { buildConfig, Config } from "../config";

export const logConfig = buildConfig((b) => ({
  datadogApiKey: b.optional("DD_API_KEY"),
}));

export type LogConfig = Config<typeof logConfig>;
