CREATE DATABASE IF NOT EXISTS database_factory;

@Expression = 'SELECT "Hello, World!";'
PREPARE myquery FROM @Expression;
INSERT INTO Results
  EXECUTE myquery;
  
USE database_factory;

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
    responsable TEXT(255) NOT NULL,
    generalFeatures TEXT(255),
    state TEXT(10),/*toAssign, assigned, returned*/
    /*A asignar en salida*/
    exitDate TEXT(10),
    deadline TEXT(10),
    name TEXT(255),
    weight DECIMAL(5,1) UNSIGNED,
    price DECIMAL(5,1) UNSIGNED,
    threads INT(2),
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

SELECT * FROM articles;
SELECT * FROM workshops;
SELECT * FROM payments;
SELECT * FROM taskCount;

SELECT * FROM tasks;
SELECT * FROM parts;
