import { ApiProperty } from "@nestjs/swagger";
import * as uuid from "uuid";
import { IGetUserByIdentityIdResult } from "../queries/getUserByIdentityId.queries";

export class DbUser {
  private constructor(user: DbUser) {
    Object.assign(this, user);
  }

  static create(user: IGetUserByIdentityIdResult) {
    return new DbUser(user);
  }

  id!: string;
  identity_id!: string;
  name!: string;
}

export class User {
  private constructor(user: User) {
    Object.assign(this, user);
  }

  static fromDbUser(user: DbUser) {
    return new User({
      id: user.id,
      identityId: user.identity_id,
      name: user.name,
    });
  }

  @ApiProperty({ description: "ID", example: uuid.v4() })
  id!: string;

  @ApiProperty({ description: "Identity ID", example: "connection|12345" })
  identityId!: string;

  @ApiProperty({ description: "Name", example: "John Smith" })
  name!: string;
}
