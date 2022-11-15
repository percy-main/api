import { Inject, Injectable } from "@nestjs/common";
import { CONFIG } from "../lib/config";
import { HomeConfig } from "./home.config";

export abstract class IHomeService {
  getHelloString: () => Promise<string>;
}

@Injectable()
export class HomeService implements IHomeService {
  constructor(@Inject(CONFIG) private readonly config: HomeConfig) {}

  public async getHelloString() {
    return this.config.greeting;
  }
}
