/** Types generated for queries found in "src/membership/queries/createMembership.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'CreateMembership' parameters type */
export interface ICreateMembershipParams {
  created_by: string;
  invalid_from: Date | null | void;
  name: string;
  price_annual: number;
  price_monthly: number;
}

/** 'CreateMembership' return type */
export interface ICreateMembershipResult {
  created_at: Date;
  created_by: string;
  id: string;
  invalid_from: Date | null;
  name: string;
  price_annual: number;
  price_monthly: number;
  updated_at: Date;
}

/** 'CreateMembership' query type */
export interface ICreateMembershipQuery {
  params: ICreateMembershipParams;
  result: ICreateMembershipResult;
}

const createMembershipIR: any = {"usedParamSet":{"name":true,"price_annual":true,"price_monthly":true,"invalid_from":true,"created_by":true},"params":[{"name":"name","required":true,"transform":{"type":"scalar"},"locs":[{"a":115,"b":120}]},{"name":"price_annual","required":true,"transform":{"type":"scalar"},"locs":[{"a":131,"b":144}]},{"name":"price_monthly","required":true,"transform":{"type":"scalar"},"locs":[{"a":155,"b":169}]},{"name":"invalid_from","required":false,"transform":{"type":"scalar"},"locs":[{"a":180,"b":192}]},{"name":"created_by","required":true,"transform":{"type":"scalar"},"locs":[{"a":203,"b":214}]}],"statement":"INSERT INTO\n    pmcc.membership (name, price_annual, price_monthly, invalid_from, created_by)\nVALUES\n    (\n        :name!,\n        :price_annual!,\n        :price_monthly!,\n        :invalid_from,\n        :created_by!\n    ) RETURNING *"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO
 *     pmcc.membership (name, price_annual, price_monthly, invalid_from, created_by)
 * VALUES
 *     (
 *         :name!,
 *         :price_annual!,
 *         :price_monthly!,
 *         :invalid_from,
 *         :created_by!
 *     ) RETURNING *
 * ```
 */
export const createMembership = new PreparedQuery<ICreateMembershipParams,ICreateMembershipResult>(createMembershipIR);


