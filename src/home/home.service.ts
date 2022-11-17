import { Inject, Injectable } from "@nestjs/common";
import { TAuthUser } from "src/auth/auth.types";
import { HomeConfig, HOME_CONFIG } from "./home.config";

export abstract class IHomeService {
  getHelloString: (user: TAuthUser) => Promise<string>;
}

@Injectable()
export class HomeService implements IHomeService {
  constructor(@Inject(HOME_CONFIG) private readonly config: HomeConfig) {}

  public async getHelloString(user: TAuthUser) {
    return `Hello ${user.sub}`;
  }
}
