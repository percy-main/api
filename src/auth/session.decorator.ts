import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { SessionContainer } from "supertokens-node/recipe/session";

export const Session = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const { session } = ctx.switchToHttp().getRequest();

    if (!session) {
      throw new Error("No user session found");
    }

    return session;
  },
);

export type TSession = SessionContainer;
