import type { JwtPayload } from "jsonwebtoken";

export type AuthUser = JwtPayload;

export interface AuthUserRequest {
  authuser: AuthUser;
}
