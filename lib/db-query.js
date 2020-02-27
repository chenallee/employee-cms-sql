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

const getEmpRoles = () => {
  //select all role titles to put them into an array of choices for the user to select from
  //this is separate from the viewAllRoles() function for now since this only returns title and not *

  //console.log('getroles');
  return new Promise((resolve, reject) => {
    const getRolesQ = connection.query('SELECT title FROM role', (err, empRoles) => {
      if (err) {
        console.error(err);
        console.log(err); 
        reject(err);
        return;
      }
      //console.log('ok');
      resolve(empRoles);
    });
    //console.log(getRolesQ.sql);
  });
}

const queryEmpRole = (selectedRole) => {

  return new Promise((resolve, reject) => {
    const getRolesQ = connection.query('SELECT e1.id, e1.first_name, e1.last_name, role.title, department.name, role.salary, concat(b1.first_name, \' \', b1.last_name) AS manager FROM employees AS e1 LEFT JOIN role ON e1.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employees AS b1 ON e1.manager_id = b1.id WHERE role.title = ?', [selectedRole], (err, rEmps) => {
      if (err) {
        console.error(err);
        console.log(err); 
        reject(err);
        return;
      }
      //console.log('ok');
      resolve(rEmps);
    });
    //console.log(getRolesQ.sql);
  });

}

module.exports = {
  viewAllEmp, getEmpRoles, queryEmpRole
}