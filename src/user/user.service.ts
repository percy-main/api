import { Injectable } from "@nestjs/common";
import { first } from "lodash";
import { Client } from "pg";
import { TSession } from "../auth/session.decorator";
import { LogService } from "../lib/logging/log.service";
import { CreateUserDTO, DbUserDTO } from "./dto/user.dto";
import { createUser } from "./queries/createUser.queries";
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

    return this.dbUserToDTO(user, result);
  }

  public async createUser(user: TSession, { name, dob }: CreateUserDTO) {
    const result = await createUser.run(
      { identity_id: user.getUserId(), name, dob },
      this.dbClient,
    );

    return this.dbUserToDTO(user, result);
  }

  private dbUserToDTO(user: TSession, result: DbUserDTO[]) {
    const dbUser = first(result);

    if (!dbUser) {
      this.logger.info("No user found by identity ID", {
        identityId: user.getUserId(),
      });
      return;
    }

    return DbUserDTO.create(dbUser);
  }
}
