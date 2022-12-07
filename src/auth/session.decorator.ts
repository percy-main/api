import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { SessionContainer } from "supertokens-node/recipe/session";
import { staticAuthConfig } from "./auth.config";

export const Session = createParamDecorator(
  (_: never, ctx: ExecutionContext) => {
    const { session } = ctx.switchToHttp().getRequest();

    if (!session) {
      if (staticAuthConfig.devMode) {
        return {
          getUserId: () => "test",
        };
      }
      throw new Error("No user session found");
    }

    return session;
  },
);

export type TSession = SessionContainer;
