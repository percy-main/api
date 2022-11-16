import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";
import { decode, JwtPayload, verify } from "jsonwebtoken";
import { LogService } from "src/lib/logging/log.service";
import { AuthUserRequest } from "./auth.types";
import { JwksService } from "./jwks.service";

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger: LogService;

  constructor(private readonly jwksService: JwksService) {
    this.logger = new LogService();
  }

  public async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      this.logger.warn("No auth header");
      return false;
    }

    const token = authHeader.substring("Bearer ".length);

    const decodedToken = decode(token, { complete: true });

    if (!decodedToken) {
      this.logger.warn("Token decoded to false");
      return false;
    }

    if (typeof decodedToken === "string") {
      this.logger.warn("Token decoded to a string");
      return false;
    }

    const { kid } = decodedToken.header;

    if (!kid) {
      this.logger.warn("Token has no KID");
      return false;
    }

    const signingKey = await this.jwksService.getKey(kid);

    return new Promise<boolean>((resolve) =>
      verify(token, signingKey.getPublicKey(), (err, result) => {
        if (err) {
          this.logger.warn("Error verifying token", { err });
          return resolve(false);
        }
        (request as unknown as AuthUserRequest).authuser = result as JwtPayload;

        resolve(true);
      }),
    );
  }
}
