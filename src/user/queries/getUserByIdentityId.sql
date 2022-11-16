/* @name GetUserByIdentityId */
SELECT
    id,
    name,
    identity_id
FROM
    pmcc.users
WHERE
    identity_id = :identity_id!
LIMIT 1;
