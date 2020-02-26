const mysql = require('mysql');

//load environment variables
require('dotenv').config();

// connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,

  //use values stored in .env file
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  database: process.env.DB_NAME
});

//export connection
module.exports = connection;

//RETURNING FULL TABLE OF EMPLOYEES IN MYSQL
/** 
USE company_cms;
SELECT 
 	e1.id, e1.first_name, e1.last_name, role.title, department.name, role.salary, concat(b1.first_name, ' ', b1.last_name) AS manager
 FROM 
 	employees AS e1
 LEFT JOIN 
 	role 
 ON 
 	e1.role_id = role.id
 LEFT JOIN 
 	department
 ON
 	role.department_id = department.id
 LEFT JOIN
 	employees AS b1
 ON
 	e1.manager_id = b1.id;
**/