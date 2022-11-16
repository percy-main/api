import type { JwtPayload } from "jsonwebtoken";

export type AuthUser = {
  sub: Exclude<JwtPayload["sub"], undefined>;
};

export interface AuthUserRequest {
  authuser: AuthUser;
}
