import { Inject, Injectable } from "@nestjs/common";
import { TSession } from "../auth/session.decorator";
import { HomeConfig, HOME_CONFIG } from "./home.config";

export abstract class IHomeService {
  getHelloString: (user: TSession) => Promise<string>;
}

@Injectable()
export class HomeService implements IHomeService {
  constructor(@Inject(HOME_CONFIG) private readonly config: HomeConfig) {}

  public async getHelloString(user: TSession) {
    return `Hello ${user.getUserId()}`;
  }
}
