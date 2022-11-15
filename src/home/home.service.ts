import { Inject, Injectable } from "@nestjs/common";
import { CONFIG } from "src/lib/config";
import { HomeConfig } from "./home.config";

@Injectable()
export class HomeService {
  constructor(@Inject(CONFIG) private readonly config: HomeConfig) {}

  public async getHelloString() {
    return this.config.greeting;
  }
}
