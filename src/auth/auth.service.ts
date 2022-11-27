import { Inject, Injectable } from "@nestjs/common";
import { compact } from "lodash";
import supertokens from "supertokens-node";
import Dashboard from "supertokens-node/recipe/dashboard";
import EmailPassword from "supertokens-node/recipe/emailpassword";
import EmailVerification, {
  EmailVerificationClaim,
} from "supertokens-node/recipe/emailverification";
import Session from "supertokens-node/recipe/session";
import { AuthConfig, AUTH_CONFIG } from "./auth.config";
import { TSession } from "./session.decorator";

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
        EmailVerification.init({ mode: "OPTIONAL" }),
      ]),
    });
  }

  public async getUserEmail(user: TSession) {
    const id = user.getUserId();

    const emailIsVerified = await user.getClaimValue(EmailVerificationClaim);
    const email = await EmailPassword.getUserById(id);

    if (!email) {
      throw new Error(`No email for user with id ${id}`);
    }

    return {
      email: email.email,
      emailIsVerified: emailIsVerified ?? false,
    };
  }
}
