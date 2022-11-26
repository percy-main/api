/* @name GetUserByIdentityId */
SELECT
    id,
    name,
    identity_id,
    dob
FROM
    pmcc.users
WHERE
    identity_id = :identity_id!
LIMIT 1;
