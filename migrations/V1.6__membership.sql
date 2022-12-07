CREATE TABLE pmcc.membership (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    price_annual SERIAL NOT NULL,
    price_monthly SERIAL NOT NULL,
    created_by UUID NOT NULL REFERENCES pmcc.users(id),
    invalid_from TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_timestamps BEFORE
UPDATE
    ON pmcc.membership FOR EACH ROW EXECUTE PROCEDURE trigger_set_timestamp();