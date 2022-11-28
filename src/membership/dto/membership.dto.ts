import { ApiProperty } from "@nestjs/swagger";
import * as uuid from "uuid";
import { CurrencyAmountDto } from "../../currency/currency-amount.dto";
import { DbMembershipDTO } from "./dbMembership.dto";

export class MembershipDTO {
  private constructor(membership: MembershipDTO) {
    Object.assign(this, membership);
  }

  static create(membership: DbMembershipDTO) {
    return new MembershipDTO({
      id: membership.id,
      name: membership.name,
      priceAnnual: new CurrencyAmountDto(membership.price_annual),
      priceMonthly: new CurrencyAmountDto(membership.price_monthly),
      invalidFrom: membership.invalid_from,
    });
  }

  @ApiProperty({ description: "ID", example: uuid.v4() })
  id!: string;

  @ApiProperty({ description: "Name", example: "Playing Member" })
  name!: string;

  @ApiProperty({
    description: "Annual price in smallest currency unit",
    example: { currency: "gbp", amount: 10000 },
  })
  priceAnnual!: CurrencyAmountDto;

  @ApiProperty({
    description: "Monthly price in smallest currency unit",
    example: { currency: "gbp", amount: 100 },
  })
  priceMonthly!: CurrencyAmountDto;

  @ApiProperty({
    description: "Date from which the membership type will no longer be valid",
    example: "2022-11-28T22:57:53.446Z",
  })
  invalidFrom!: Date | null;
}
