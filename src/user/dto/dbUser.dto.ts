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
