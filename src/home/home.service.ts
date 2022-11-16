import { Inject, Injectable } from "@nestjs/common";
import { AuthUser } from "src/auth/auth.types";
import { HomeConfig, HOME_CONFIG } from "./home.config";

export abstract class IHomeService {
  getHelloString: (user: AuthUser) => Promise<string>;
}

@Injectable()
export class HomeService implements IHomeService {
  constructor(@Inject(HOME_CONFIG) private readonly config: HomeConfig) {}

  public async getHelloString(user: AuthUser) {
    return `Hello ${user.sub}`;
  }
}
