import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { AuthUserRequest, TAuthUser } from "./auth.types";

export const AuthUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): TAuthUser => {
    const request = context.switchToHttp().getRequest<AuthUserRequest>();
    return request.authuser;
  },
);
