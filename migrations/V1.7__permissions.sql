CREATE TABLE pmcc.permissions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT UNIQUE NOT NULL
);

INSERT INTO
    pmcc.permissions (name)
VALUES
    ('create membership');