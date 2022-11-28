import { buildConfig, Config } from "../lib/config";

export const AUTH_CONFIG = Symbol("AUTH_CONFIG");

export const authConfig = buildConfig((b) => ({
  appInfo: b.section(
    buildConfig((c) => ({
      appName: c.required("AUTH_APP_NAME"),
      websiteDomain: c.required("AUTH_WEBSITE_DOMAIN"),
      websiteBasePath: c.optional("AUTH_WEBSITE_BASE_PATH"),
      apiDomain: c.required("AUTH_API_DOMAIN"),
      apiBasePath: c.optional("AUTH_API_BASE_PATH"),
      apiGatewayBasePath: c.optional("AUTH_API_GATEWAY_BASE_PATH"),
    })),
  ),
  connectionURI: b.required("AUTH_CONNECTION_URI"),
  apiKey: b.optional("AUTH_API_KEY"),
  devMode: b.optional("DEV_MODE", {
    coerce: b.coerce.bool,
  }),
}));

export const staticAuthConfig = authConfig();

export type AuthConfig = Config<typeof authConfig>;
