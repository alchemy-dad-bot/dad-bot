-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS users_dadbot CASCADE;

CREATE TABLE users_dadbot (
id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
user_id TEXT NOT NULL,
content TEXT NOT NULL
);