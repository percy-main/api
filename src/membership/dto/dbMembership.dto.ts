import type { ICreateMembershipResult } from "../queries/createMembership.queries";

export class DbMembershipDTO {
  private constructor(membership: DbMembershipDTO) {
    Object.assign(this, membership);
  }

  static create(membership: ICreateMembershipResult) {
    return new DbMembershipDTO(membership);
  }

  id!: string;
  name!: string;
  price_annual!: number;
  price_monthly!: number;
  created_by!: string;
  invalid_from: Date | null;
  created_at!: Date;
  updated_at!: Date;
}
