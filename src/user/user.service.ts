import { Injectable } from "@nestjs/common";
import { first } from "lodash";
import { Client } from "pg";
import { AuthUser } from "../auth/auth.types";
import { LogService } from "../lib/logging/log.service";
import { DbUser } from "./dto/dbuser.dto";
import { getUserByIdentityId } from "./queries/getUserByIdentityId.queries";

@Injectable()
export class UserService {
  constructor(
    private readonly dbClient: Client,
    private readonly logger: LogService,
  ) {}

  public async getUserByIdentityId(user: AuthUser) {
    const result = await getUserByIdentityId.run(
      { identity_id: user.sub },
      this.dbClient,
    );

    const dbUser = first(result);

    if (!dbUser) {
      this.logger.info("No user found by identity ID", {
        identityId: user.sub,
      });
      return;
    }

    return DbUser.create(dbUser);
  }
}
