import { Inject, Injectable } from "@nestjs/common";
import supertokens from "supertokens-node";
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
      recipeList: [EmailPassword.init(), Session.init()],
    });
  }
}
