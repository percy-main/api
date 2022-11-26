import { ApiProperty } from "@nestjs/swagger";
import * as uuid from "uuid";
import { IGetUserByIdentityIdResult } from "../queries/getUserByIdentityId.queries";

export class DbUserDTO {
  private constructor(user: DbUserDTO) {
    Object.assign(this, user);
  }

  static create(user: IGetUserByIdentityIdResult) {
    return new DbUserDTO(user);
  }

  id!: string;
  identity_id!: string;
  name!: string;
  dob!: Date;
}

export class UserDTO {
  private constructor(user: UserDTO) {
    Object.assign(this, user);
  }

  static fromDbUser(user: DbUserDTO) {
    return new UserDTO({
      id: user.id,
      identityId: user.identity_id,
      name: user.name,
      dob: user.dob,
    });
  }

  @ApiProperty({ description: "ID", example: uuid.v4() })
  id!: string;

  @ApiProperty({ description: "Identity ID", example: "connection|12345" })
  identityId!: string;

  @ApiProperty({ description: "Name", example: "John Smith" })
  name!: string;

  @ApiProperty({ description: "Date Of Birth", example: "01/01/1980" })
  dob!: Date;
}

export class CreateUserDTO {
  @ApiProperty({ description: "Identity ID", example: "connection|12345" })
  identityId!: string;

  @ApiProperty({ description: "Name", example: "John Smith" })
  name!: string;

  @ApiProperty({ description: "Date Of Birth", example: "01/01/1980" })
  dob!: Date;
}
