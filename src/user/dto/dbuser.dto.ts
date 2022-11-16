import { IGetUserByIdentityIdResult } from "../queries/getUserByIdentityId.queries";

export class DbUser {
  private constructor(user: DbUser) {
    Object.assign(this, user);
  }

  static create(user: IGetUserByIdentityIdResult) {
    return new DbUser({
      id: user.id,
      identityId: user.identity_id,
      name: user.name,
    });
  }

  id!: string;

  identityId!: string;

  name!: string;
}
