import type { JwtPayload } from "jsonwebtoken";

export type TAuthUser = {
  sub: Exclude<JwtPayload["sub"], undefined>;
};

export interface AuthUserRequest {
  authuser: TAuthUser;
}
