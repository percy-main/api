/* @name CreateUser */
INSERT INTO pmcc.users (name, identity_id, dob) VALUES (:name!, :identity_id!, :dob!) RETURNING id, identity_id, name, dob;