import { Inject, Injectable } from "@nestjs/common";
import { compact } from "lodash";
import supertokens from "supertokens-node";
import Dashboard from "supertokens-node/recipe/dashboard";
import EmailPassword from "supertokens-node/recipe/emailpassword";
import Session from "supertokens-node/recipe/session";
import { AuthConfig, AUTH_CONFIG } from "./auth.config";
@Injectable()
export class AuthService {
  constructor(@Inject(AUTH_CONFIG) config: AuthConfig) {
    supertokens.init({
      appInfo: config.appInfo,
      supertokens: {
        connectionURI: config.connectionURI,
        apiKey: config.apiKey,
      },
      recipeList: compact([
        EmailPassword.init(),
        Session.init(),
        config.apiKey && Dashboard.init({ apiKey: config.apiKey }),
      ]),
    });
  }
}
