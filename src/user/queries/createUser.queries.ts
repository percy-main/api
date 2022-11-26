/** Types generated for queries found in "src/user/queries/createUser.sql" */
import { PreparedQuery } from '@pgtyped/query';

/** 'CreateUser' parameters type */
export interface ICreateUserParams {
  dob: Date;
  identity_id: string;
  name: string;
}

/** 'CreateUser' return type */
export interface ICreateUserResult {
  dob: Date | null;
  id: string;
  identity_id: string;
  name: string;
}

/** 'CreateUser' query type */
export interface ICreateUserQuery {
  params: ICreateUserParams;
  result: ICreateUserResult;
}

const createUserIR: any = {"usedParamSet":{"name":true,"identity_id":true,"dob":true},"params":[{"name":"name","required":true,"transform":{"type":"scalar"},"locs":[{"a":56,"b":61}]},{"name":"identity_id","required":true,"transform":{"type":"scalar"},"locs":[{"a":64,"b":76}]},{"name":"dob","required":true,"transform":{"type":"scalar"},"locs":[{"a":79,"b":83}]}],"statement":"INSERT INTO pmcc.users (name, identity_id, dob) VALUES (:name!, :identity_id!, :dob!) RETURNING id, identity_id, name, dob"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO pmcc.users (name, identity_id, dob) VALUES (:name!, :identity_id!, :dob!) RETURNING id, identity_id, name, dob
 * ```
 */
export const createUser = new PreparedQuery<ICreateUserParams,ICreateUserResult>(createUserIR);


