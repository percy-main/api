/* @name GetUserPermissions */
SELECT
    p.name
FROM
    pmcc.users u
    LEFT JOIN pmcc.user_permissions up ON up.user_id = u.id
    LEFT JOIN pmcc.permissions p ON p.id = up.permissions_id
WHERE
    u.identity_id = :identity_id!;