/** Types generated for queries found in "src/user/queries/getUserByIdentityId.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'GetUserByIdentityId' parameters type */
export interface IGetUserByIdentityIdParams {
  identity_id: string;
}

/** 'GetUserByIdentityId' return type */
export interface IGetUserByIdentityIdResult {
  dob: Date;
  id: string;
  identity_id: string;
  name: string;
}

/** 'GetUserByIdentityId' query type */
export interface IGetUserByIdentityIdQuery {
  params: IGetUserByIdentityIdParams;
  result: IGetUserByIdentityIdResult;
}

const getUserByIdentityIdIR: any = {"usedParamSet":{"identity_id":true},"params":[{"name":"identity_id","required":true,"transform":{"type":"scalar"},"locs":[{"a":94,"b":106}]}],"statement":"SELECT\n    id,\n    name,\n    identity_id,\n    dob\nFROM\n    pmcc.users\nWHERE\n    identity_id = :identity_id!\nLIMIT 1"};

/**
 * Query generated from SQL:
 * ```
 * SELECT
 *     id,
 *     name,
 *     identity_id,
 *     dob
 * FROM
 *     pmcc.users
 * WHERE
 *     identity_id = :identity_id!
 * LIMIT 1
 * ```
 */
export const getUserByIdentityId = new PreparedQuery<IGetUserByIdentityIdParams,IGetUserByIdentityIdResult>(getUserByIdentityIdIR);


