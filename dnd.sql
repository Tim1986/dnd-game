DROP DATABASE IF EXISTS dnd_db;

CREATE DATABASE dnd_db;

USE dnd_db;

CREATE TABLE characters (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  race varchar(255),
  subrace varchar(255),
  class varchar(255),
  subclass varchar(255) DEFAULT "None",
  strength int,
  constitution int,
  dexterity int,
  intelligence int,
  wisdom int,
  charisma int,
  weapon varchar(255),
  armortype varchar(255),
  shield boolean,
  armorclass int,
  hitpoints int,
  level int,
  UNIQUE (name),
  PRIMARY KEY (id)
);
