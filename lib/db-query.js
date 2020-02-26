const connection = require('../config/connection');

const viewAllEmp = () => {

  return new Promise((resolve, reject) => {
    const getAllEmpQ = connection.query('SELECT e1.id, e1.first_name, e1.last_name, role.title, department.name, role.salary, concat(b1.first_name, \' \', b1.last_name) AS manager FROM employees AS e1 LEFT JOIN role ON e1.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employees AS b1 ON e1.manager_id = b1.id', (err, allEmps) => {
      if (err) {
        console.error(err);
        reject(err);
        return;
      }
      resolve(allEmps);
    });
    //console.log(getAllEmpQ.sql);
  });
}

module.exports = {
  viewAllEmp
}