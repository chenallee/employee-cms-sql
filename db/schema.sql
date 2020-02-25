DROP DATABASE IF EXISTS company_cms;

CREATE DATABASE company_cms;

USE company_cms;
-------------------------------------------------------------------------------------
CREATE TABLE employees (
  id INTEGER AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER,
  manager_id INTEGER,
  PRIMARY KEY (id)
);
-------------------------------------------------------------------------------------
CREATE TABLE role (
  id INTEGER AUTO_INCREMENT NOT NULL,
  title VARCHAR(30) NOT NULL,
  salary decimal(10, 2) NOT NULL,
  department_id INTEGER,
  PRIMARY KEY (id)
);
-------------------------------------------------------------------------------------
CREATE TABLE department (
  id INTEGER AUTO_INCREMENT NOT NULL,
  name VARCHAR(30),
  PRIMARY KEY (id)
);