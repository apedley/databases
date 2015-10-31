DROP DATABASE IF EXISTS chat;
CREATE DATABASE chat;

USE chat;

CREATE TABLE rooms (
  id int PRIMARY KEY AUTO_INCREMENT,
  name varChar(20) NOT NULL
);

CREATE TABLE messages (
  id int PRIMARY KEY AUTO_INCREMENT,
  body text NOT NULL,
  user varChar(50) DEFAULT 'Anonymous',
  room_id int,
  FOREIGN KEY (room_id) REFERENCES rooms(id),
  createdAt int NOT NULL
);


INSERT INTO rooms (name)
VALUES ('lobby');
INSERT INTO rooms (name)
VALUES ('lobby2');

INSERT INTO messages (body, user, createdAt, room_id)
VALUES ('Hello Hack Reator From SQL', 'Student0', UNIX_TIMESTAMP(NOW()), 1);

INSERT INTO messages (body, user, createdAt)
VALUES('Hola', 'Transfer Student', UNIX_TIMESTAMP(NOW()));
/* Create other tables and define schemas for them here! */

SELECT *
FROM messages;

SELECT user
FROM messages;

SELECT rooms.name, messages.body
FROM rooms, messages
WHERE messages.room_id = rooms.id;
/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

