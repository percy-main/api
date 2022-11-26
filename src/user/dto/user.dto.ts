import { ApiProperty } from "@nestjs/swagger";
import dayjs from "dayjs";
import * as uuid from "uuid";
import { DbUserDTO } from "./dbUser.dto";

export class UserDTO {
  private constructor(user: UserDTO) {
    Object.assign(this, user);
  }

  static fromDbUser(user: DbUserDTO) {
    return new UserDTO({
      id: user.id,
      identityId: user.identity_id,
      name: user.name,
      dob: dayjs(user.dob).format("YYYY-MM-DD"),
    });
  }

  @ApiProperty({ description: "ID", example: uuid.v4() })
  id!: string;

  @ApiProperty({ description: "Identity ID", example: "connection|12345" })
  identityId!: string;

  @ApiProperty({ description: "Name", example: "John Smith" })
  name!: string;

  @ApiProperty({ description: "Date Of Birth", example: "2002-11-26" })
  dob!: string;
}
