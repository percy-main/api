/* @name CreateMembership */
INSERT INTO
    pmcc.membership (name, price_annual, price_monthly, invalid_from, created_by)
VALUES
    (
        :name!,
        :price_annual!,
        :price_monthly!,
        :invalid_from,
        :created_by!
    ) RETURNING *;