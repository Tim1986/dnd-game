DROP DATABASE IF EXISTS dnd_db;

CREATE DATABASE dnd_db;

USE dnd_db;

CREATE TABLE characters (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  UNIQUE (name),
  PRIMARY KEY (id)
);
