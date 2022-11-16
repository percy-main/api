import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { AuthUser, AuthUserRequest } from "./auth.types";

export const User = createParamDecorator(
  (data: unknown, context: ExecutionContext): AuthUser => {
    const request = context.switchToHttp().getRequest<AuthUserRequest>();
    return request.authuser;
  },
);
