import { Inject, Injectable } from "@nestjs/common";
import JwksRsa, { JwksClient } from "jwks-rsa";
import { AuthConfig, AUTH_CONFIG } from "./auth.config";

@Injectable()
export class JwksService {
  private readonly jwksClient: JwksClient;

  constructor(@Inject(AUTH_CONFIG) config: AuthConfig) {
    this.jwksClient = JwksRsa({
      jwksUri: config.jwksUri,
    });
  }

  public getKey(kid: string) {
    return this.jwksClient.getSigningKey(kid);
  }
}
