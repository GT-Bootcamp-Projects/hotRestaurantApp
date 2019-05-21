DROP DATABASE IF EXISTS hotrestaurant;

CREATE DATABASE hotrestaurant;

USE hotrestaurant;

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(250) NOT NULL,
  email VARCHAR(250) NOT NULL,
  phone VARCHAR(250),
  PRIMARY KEY (id)
);

CREATE TABLE reservations (
  id INT NOT NULL AUTO_INCREMENT,
  userId INT,
  reservationDateTime VARCHAR(250) NOT NULL,
  waitingList BOOLEAN,
  PRIMARY KEY (id),
  FOREIGN KEY (userId) REFERENCES users(id)
);
