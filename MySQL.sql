CREATE DATABASE IF NOT EXISTS virtualnau;
  
USE virtualnau;

CREATE TABLE IF NOT EXISTS users(
    id INT(2) UNSIGNED NOT NULL UNIQUE,
    name TEXT(30) NOT NULL UNIQUE,
    password TEXT(20) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS articles(
	id INT(5) UNSIGNED NOT NULL UNIQUE,/*99.999*/
    description TEXT(255) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS workshops(
    id INT(3) UNSIGNED NOT NULL AUTO_INCREMENT,/*1.000*/
    name TEXT(255) NOT NULL UNIQUE,
    contact TEXT(255),
    money DECIMAL(7,1) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS tasks(
	id INT(3) NOT NULL,
    /*A asignar con la tarea*/
    article_id INT(5) UNSIGNED NOT NULL,
    article_description TEXT(255),
    quantity INT(5) UNSIGNED NOT NULL,/*La cantidad total pedida*/
    packages INT(2) UNSIGNED NOT NULL,
    cutDate TEXT(10),
    fabrics TEXT(255),
    colors TEXT(255),
    responsible TEXT(255) NOT NULL,
    generalFeatures TEXT(255),
    state TEXT(10),/*toAssign, assigned, returned*/
    /*A asignar en salida*/
    exitDate TEXT(10),
    deadline TEXT(10),
    name TEXT(255),
    weight DECIMAL(5,1) UNSIGNED,
    price DECIMAL(5,1) UNSIGNED,
    threads INT(2),
    paid bit,
    /*A asignar en entrada*/
    calification INT(2),
    observations TEXT(255),
    faulty INT(2),
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS payments(
	id INT(7) UNSIGNED NOT NULL AUTO_INCREMENT,
    name TEXT(255) NOT NULL,/*Puede que no sea necesario*/
	date TEXT(10) NOT NULL,
    money INT(5) UNSIGNED NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS parts(
	id INT(4) UNSIGNED NOT NULL AUTO_INCREMENT,
    task INT(3) UNSIGNED NOT NULL,
    date TEXT(10) NOT NULL,
    threads INT(2) NOT NULL,/*Lo entregado*/
    quantity INT(5) NOT NULL,/*Lo entregado*/
    weight DECIMAL(5,1) NOT NULL,/*Lo entregado*/
    money DECIMAL(7,1) NOT NULL,/*Lo entregado*/
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS taskCount(
	id INT(1) AUTO_INCREMENT,
    count INT(3) UNSIGNED NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS customer(
	customerId INT(3) UNSIGNED NOT NULL AUTO_INCREMENT,
    customerName TEXT(255) NOT NULL,
    PRIMARY KEY(customerId)
);

INSERT INTO users (id, name, password) VALUES (1,'manager','gatito');
INSERT INTO users (id, name, password) VALUES (2,'vendor','ciervo');
INSERT INTO users (id, name, password) VALUES (3,'production','jirafa');
INSERT INTO users (id, name, password) VALUES (4,'workshops','tigre');
INSERT INTO users (id, name, password) VALUES (5,'expedition','koala');
INSERT INTO articles (id, description) VALUES (343,'Media');
INSERT INTO articles (id, description) VALUES (567,'Mochila');
INSERT INTO articles (id, description) VALUES (222,'Remera');
INSERT INTO articles (id, description) VALUES (258,'Pantalon');
INSERT INTO articles (id, description) VALUES (198,'Gorro');
INSERT INTO workshops (id, name, contact, money) VALUES (1,'Rogelioshop','1141617737',30000);
INSERT INTO workshops (id, name, contact, money) VALUES (2,'Valentinshop','1145893211',34000);
INSERT INTO workshops (id, name, contact, money) VALUES (3,'Lodeloshop','1176543219',38000);
INSERT INTO payments (id, name, date, money) VALUES (598,'Rogelioshop','2022/6/16',5000);
INSERT INTO payments (id, name, date, money) VALUES (456,'Rogelioshop','2022/6/17',6000);
INSERT INTO payments (id, name, date, money) VALUES (764,'Valentinshop','2022/6/22',3000);
INSERT INTO payments (id, name, date, money) VALUES (123,'Lodeloshop','2022/6/14',2500);
INSERT INTO payments (id, name, date, money) VALUES (789,'Lodeloshop','2022/6/29',10000);
INSERT INTO tasks (id, article_id, article_description, quantity, packages, cutDate, fabrics, colors, responsible, generalFeatures, state) VALUES (1,343,'Media',200,10,'2022/6/20','Gagas.inc','Azul','Vendedor','Tamaño x diseño x','Pendiente');
INSERT INTO taskcount (id, count) VALUES (0,1);
INSERT INTO customer (customerName) VALUES ('Alejandro');
INSERT INTO customer (customerName) VALUES ('Irene');
INSERT INTO customer (customerName) VALUES ('Walter');
INSERT INTO customer (customerName) VALUES ('Mauro');
INSERT INTO customer (customerName) VALUES ('Mortimer');


SELECT * FROM users;
SELECT * FROM articles;
SELECT * FROM workshops;
SELECT * FROM payments;
SELECT * FROM taskCount;
SELECT * FROM tasks;
SELECT * FROM parts;
SELECT * FROM customer;