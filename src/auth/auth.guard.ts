import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from "@nestjs/common";
import { Request } from "express";
import { decode, verify } from "jsonwebtoken";
import { LogService } from "src/lib/logging/log.service";
import { AuthConfig, AUTH_CONFIG } from "./auth.config";
import { AuthUserRequest, TAuthUser } from "./auth.types";
import { JwksService } from "./jwks.service";

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger: LogService;

  constructor(
    private readonly jwksService: JwksService,
    @Inject(AUTH_CONFIG) private readonly config: AuthConfig,
  ) {
    this.logger = new LogService();
  }

  public async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();

    if (this.config.authDisabled) {
      (request as unknown as AuthUserRequest).authuser = {
        sub: "local|12345",
      } as TAuthUser;
      return true;
    }

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
        (request as unknown as AuthUserRequest).authuser = result as TAuthUser;

        resolve(true);
      }),
    );
  }
}
