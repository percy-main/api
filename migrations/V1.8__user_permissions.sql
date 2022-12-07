CREATE TABLE pmcc.user_permissions (
    user_id UUID REFERENCES pmcc.users(id),
    permissions_id UUID REFERENCES pmcc.permissions(id)
);