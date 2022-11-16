CREATE TABLE pmcc.users
(
    id          UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    identity_id TEXT  NOT NULL,
    name        TEXT NOT NULL
);