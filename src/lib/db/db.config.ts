import { buildConfig, Config } from "../config";

export const DB_CONFIG = Symbol("DB_CONFIG");

export const dbConfig = buildConfig((b) => ({
  host: b.required("DB_HOST"),
  user: b.required("DB_USER"),
  password: b.required("DB_PASSWORD"),
  database: b.required("DB_DATABASE"),
  port: b.required("DB_PORT", {
    coerce: b.coerce.number,
    validate: b.validate.number,
  }),
}));

export type DbConfig = Config<typeof dbConfig>;
