/** Types generated for queries found in "src/user/queries/getUserPermissions.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'GetUserPermissions' parameters type */
export interface IGetUserPermissionsParams {
  identity_id: string;
}

/** 'GetUserPermissions' return type */
export interface IGetUserPermissionsResult {
  name: string;
}

/** 'GetUserPermissions' query type */
export interface IGetUserPermissionsQuery {
  params: IGetUserPermissionsParams;
  result: IGetUserPermissionsResult;
}

const getUserPermissionsIR: any = {"usedParamSet":{"identity_id":true},"params":[{"name":"identity_id","required":true,"transform":{"type":"scalar"},"locs":[{"a":187,"b":199}]}],"statement":"SELECT\n    p.name\nFROM\n    pmcc.users u\n    LEFT JOIN pmcc.user_permissions up ON up.user_id = u.id\n    LEFT JOIN pmcc.permissions p ON p.id = up.permissions_id\nWHERE\n    u.identity_id = :identity_id!"};

/**
 * Query generated from SQL:
 * ```
 * SELECT
 *     p.name
 * FROM
 *     pmcc.users u
 *     LEFT JOIN pmcc.user_permissions up ON up.user_id = u.id
 *     LEFT JOIN pmcc.permissions p ON p.id = up.permissions_id
 * WHERE
 *     u.identity_id = :identity_id!
 * ```
 */
export const getUserPermissions = new PreparedQuery<IGetUserPermissionsParams,IGetUserPermissionsResult>(getUserPermissionsIR);


