-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS users_dadbot CASCADE;
DROP TABLE IF EXISTS creators CASCADE;

CREATE TABLE users_dadbot (
id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
user_id TEXT NOT NULL,
content TEXT NOT NULL
);

CREATE TABLE creators (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    linkedin TEXT NOT NULL,
    github TEXT NOT NULL,
    image_id TEXT NOT NULL
);



INSERT INTO creators (name, linkedin, github, image_id) VALUES
('Alejandra El-Dasouki', 'https://www.linkedin.com/in/alejandrael-dasouki', 'https://github.com/Alejae1998', 'https://media-exp1.licdn.com/dms/image/C5603AQGaWCezkSXVZA/profile-displayphoto-shrink_800_800/0/1659031580020?e=1667433600&v=beta&t=qhLVjtuwT6xq7EvKqcHJsS5_xYlDdjq55YJ_3gEy1lI'),
('Austin Han', 'https://www.linkedin.com/in/austin-han-740a69157', 'https://github.com/austinbhan', '../public/austin.jpeg'),
('Olivia Pasion', 'https://www.linkedin.com/in/olivia-pasion', 'https://github.com/Olivia-Pasion', '../public/olivia.jpeg'),
('Brien Thomas', 'https://www.linkedin.com/in/brien-thomas', 'https://github.com/briensthomas', '../public/brien.jpeg');

