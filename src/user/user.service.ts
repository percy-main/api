import { Injectable } from "@nestjs/common";
import { first } from "lodash";
import { Client } from "pg";
import { TSession } from "../auth/session.decorator";
import { LogService } from "../lib/logging/log.service";
import { DbUser } from "./dto/user.dto";
import { getUserByIdentityId } from "./queries/getUserByIdentityId.queries";

@Injectable()
export class UserService {
  constructor(
    private readonly dbClient: Client,
    private readonly logger: LogService,
  ) {}

  public async getUserByIdentityId(user: TSession) {
    const result = await getUserByIdentityId.run(
      { identity_id: user.getUserId() },
      this.dbClient,
    );

    const dbUser = first(result);

    if (!dbUser) {
      this.logger.info("No user found by identity ID", {
        identityId: user.getUserId(),
      });
      return;
    }

    return DbUser.create(dbUser);
  }
}
