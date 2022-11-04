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
    fabrics INT(3),
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
    threads INT(3),
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
    id INT(3) UNSIGNED NOT NULL AUTO_INCREMENT,
    name TEXT(255) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS vendorOrders(
	id INT (3) NOT NULL,
    customerName TEXT (255) NOT NULL,
    article_id INT (5) UNSIGNED NOT NULL,
    article_description TEXT (255),
    quantity INT (5) UNSIGNED NOT NULL,
    colors TEXT (255),
    entryDate TEXT (10),
	PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS productionOrders(
	id INT (3) NOT NULL,
    article_id INT (5) UNSIGNED NOT NULL,
    quantity INT (5) UNSIGNED NOT NULL,
    colors TEXT (255),
    fabrics INT (3),
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS recipe(
    id SERIAL,
    article_id INT (5) UNSIGNED NOT NULL,
    material_id INT (5) NOT NULL,
    quantity INT (3) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS materials(
    id INT (5) NOT NULL,
    description TEXT (255) NOT NULL,
    quantity INT (3) UNSIGNED,
    weight DECIMAL (6,2),
    meters DECIMAL (5,1),
	PRIMARY KEY(id)
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
INSERT INTO payments (id, name, date, money) VALUES (598,'Rogelioshop','16/06/2022',5000);
INSERT INTO payments (id, name, date, money) VALUES (456,'Rogelioshop','17/06/2022',6000);
INSERT INTO payments (id, name, date, money) VALUES (764,'Valentinshop','22/06/2022',3000);
INSERT INTO payments (id, name, date, money) VALUES (123,'Lodeloshop','01/08/2022',2500);
INSERT INTO payments (id, name, date, money) VALUES (789,'Lodeloshop','10/07/2022',10000);
INSERT INTO tasks (id, article_id, article_description, quantity, packages, cutDate, fabrics, colors, responsible, generalFeatures, state) VALUES (1,343,'Media',200,10,'6/01/2021','Gagas.inc','Azul','Vendedor','Tamaño x diseño x','toAssign');
INSERT INTO taskcount (id, count) VALUES (0,1);
INSERT INTO vendorOrders (id, customerName, article_id, article_description, quantity, colors, entryDate) VALUES (1,'Rogelioshop',250,'Mochila',200,'Verde','15/01/2021');
INSERT INTO productionOrders (id, article_id, quantity, colors, fabrics) VALUES (1,144,200,'Roja','Gamuza');
INSERT INTO materials (id, description, quantity, weight, meters) VALUES (200,'Carton',25,1.5,1.2);
INSERT INTO materials (id, description, quantity, weight, meters) VALUES (201,'PVU',25,2,null);
INSERT INTO materials (id, description, quantity, weight, meters) VALUES (202,'Lana',25,null,1);


DROP TABLE demsar;
CREATE TABLE demsar(
    id SERIAL PRIMARY KEY,
    art VARCHAR(20),
    quantity INT,
    date DATE);
INSERT INTO demsar (art, quantity, date) VALUES
	('Pantalón', 150, '2022-12-12'),
    ('Pantalón', 200, '2022-12-20'),
    ('Pantalón', 210, '2022-12-29'),
    ('Pantalón', 10, '2021-10-15'),
    ('Pantalón', 20, '2021-10-13'),
    ('Riñonera', 50, '2021-10-14'),
    ('Riñonera', 83, '2022-11-09'),
    ('Riñonera', 72, '2022-09-05'),
    ('Riñonera', 93, '2022-09-02'),
    ('Riñonera', 10, '2022-11-06'),
    ('Cartuchera', 159, '2012-05-25'),
    ('Cartuchera', 81, '2022-11-22'),
    ('Cartuchera', 63, '2022-11-24');