import { buildConfig } from "./lib/config";

export const appConfig = buildConfig((b) => ({
  port: b.required("PORT", {
    coerce: b.coerce.number,
    validate: b.validate.number,
  }),
}))();
