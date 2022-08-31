-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS users_dadbot CASCADE;
DROP TABLE IF EXISTS creators CASCADE;
DROP TABLE IF EXISTS dadbot_favorites;

CREATE TABLE users_dadbot (
id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
user_id TEXT NOT NULL,
content TEXT NOT NULL
);

CREATE TABLE creators (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    linkedin TEXT NOT NULL,
    github TEXT NOT NULL
);


CREATE TABLE dadbot_favorites (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id TEXT NOT NULL,
    content TEXT NOT NULL
);


INSERT INTO creators (name, linkedin, github) VALUES
('Alejandra El-Dasouki', 'https://www.linkedin.com/in/alejandrael-dasouki', 'https://github.com/Alejae1998'),
('Austin Han', 'https://www.linkedin.com/in/austin-han-740a69157', 'https://github.com/austinbhan'),
('Olivia Pasion', 'https://www.linkedin.com/in/olivia-pasion', 'https://github.com/Olivia-Pasion'),
('Brien Thomas', 'https://www.linkedin.com/in/brien-thomas', 'https://github.com/briensthomas');

