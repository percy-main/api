import { buildConfig, Config } from "../config";

export const DB_CONFIG = Symbol("DB_CONFIG");

export const dbConfig = buildConfig((b) => ({
  connectionString: b.required("DATABASE_URL"),
}));

export type DbConfig = Config<typeof dbConfig>;
