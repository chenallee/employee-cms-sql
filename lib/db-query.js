const connection = require('../config/connection');

const viewAllEmp = () => { 
return new Promise((resolve, reject) => {
    const allEmpQuery = connection.query('SELECT e1.id, e1.first_name, e1.last_name, role.title, department.name, role.salary, concat(b1.first_name, \' \', b1.last_name) AS manager FROM employees AS e1 LEFT JOIN role ON e1.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employees AS b1 ON e1.manager_id = b1.id', (err, allEmps) => {
      if (err) {
        console.error(err);
        reject(err);
        return;
      }
      resolve(allEmps);
    });

  });
}

const getEmpRoles = () => {
  //select all role titles to put them into an array of choices for the user to select from
  //this is separate from the viewAllRoles() function for now since this only returns title and not *

  return new Promise((resolve, reject) => {
    const getRolesQuery = connection.query('SELECT id, title FROM role', (err, empRoles) => {
      if (err) {
        console.error(err);
        reject(err);
        return;
      }
      resolve(empRoles);
    });
  });
}

const queryEmpRole = (selectedRole) => {

  return new Promise((resolve, reject) => {
    const empRolesQuery = connection.query('SELECT e1.id, e1.first_name, e1.last_name, role.title, department.name, role.salary, concat(b1.first_name, \' \', b1.last_name) AS manager FROM employees AS e1 LEFT JOIN role ON e1.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employees AS b1 ON e1.manager_id = b1.id WHERE e1.role_id = ?', [selectedRole], (err, rEmps) => {
      if (err) {
        console.error(err);
        reject(err);
        return;
      }
      resolve(rEmps);
    });
  });
}

const getManagers = () => {

  return new Promise ((resolve, reject) => {
    const getmanagersQuery = connection.query('SELECT b1.id, concat(b1.first_name, \' \', b1.last_name) AS manager FROM employees AS e1 INNER JOIN employees AS b1 ON e1.manager_id = b1.id', (err, managers) => {
      if (err) {
        console.error(err);
        reject(err);
        return;
      }
      resolve(managers);
    })
  })
}

const queryEmpManager = (selectedManager) => {
  return new Promise((resolve, reject) => {
    const empRolesQuery = connection.query('SELECT e1.id, e1.first_name, e1.last_name, role.title, department.name, role.salary, concat(b1.first_name, \' \', b1.last_name) AS manager FROM employees AS e1 LEFT JOIN role ON e1.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employees AS b1 ON e1.manager_id = b1.id WHERE  b1.id = ?', [selectedManager], (err, rEmps) => {
      if (err) {
        console.error(err);
        reject(err);
        return;
      }
      resolve(rEmps);
    });
  });
}

//returns only id and concat names for employees
const getEmpShort = () => {

  return new Promise((resolve, reject) => {
    const getEmpsQuery = connection.query('SELECT id, concat(first_name, \' \', last_name) AS name FROM employees', (err, employees) => {
      if (err) {
        console.error(err);
        reject(err);
        return;
      }
      resolve(employees);
    });
  });
}

const updateEmpRole = (newRole, selectedEmp) => {
  return new Promise((resolve, reject) => {
    const updateRoleQuery= connection.query('UPDATE employees SET role_id = ? WHERE id = ?', [newRole, selectedEmp], (err, roleUpdated) => {
      if (err) {
        console.error(err);
        reject(err);
        return;
      }
      resolve();
    });
  });
}

const updateEmpManager = (newManager, selectedEmp) => {
  return new Promise((resolve, reject) => {
    const updateRoleQuery= connection.query('UPDATE employees SET manager_id = ? WHERE id = ?', [newManager, selectedEmp], (err, managerUpdated) => {
      if (err) {
        console.error(err);
        reject(err);
        return;
      }
      resolve();
    });
  });
}

const addNewEmp = (newEmpData) => {
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO employees set ?', newEmpData, (err, empAdded) => {
      if (err){
        console.error(err);
        reject(err);
        return;
      }
      resolve();
    })
  });
}

const deleteEmp = (id) => {
  return new Promise((resolve, reject) => {
    connection.query('DELETE FROM employees WHERE id = ?', [id], (err, empDeleted) => {
      if (err){
        console.error(err);
        reject(err);
        return;
      }
      resolve();
    });
  });
}

const getRolesTable = () => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT role.id, role.title, role.salary, department.name FROM role LEFT JOIN department ON role.department_id = department.id', (err, rolesTable) => {
      if (err){
        console.error(err);
        reject(err);
        return;
      }
      resolve(rolesTable);
    });
  });
}

const getDepts = () => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM department', (err, deptsRes) => {
      if (err){
        console.error(err);
        reject(err);
        return;
      }
      resolve(deptsRes);
    });
  });
}

const addNewRole = (newRoleData) => {
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO role set ?', newRoleData, (err, roleAdded) => {
      if (err){
        console.error(err);
        reject(err);
        return;
      }
      resolve();
    })
  });
}

const deleteRole = (id) => {
  return new Promise((resolve, reject) => {
    connection.query('DELETE FROM role WHERE id = ?', [id], (err, roleDeleted) => {
      if (err){
        console.error(err);
        reject(err);
        return;
      }
      resolve();
    });
  });
}

const getDeptSalaries = (id) => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT role.salary FROM role RIGHT JOIN employees ON employees.role_id = role.id LEFT JOIN department ON role.department_id = department.id WHERE department.id = ?', [id], (err, salaries) => {
      if (err){
        console.error(err);
        reject(err);
        return;
      }
      resolve(salaries);
    });
  });
}

const deleteDept = (id) => {
  return new Promise((resolve, reject) => {
    connection.query('DELETE FROM department WHERE id = ?', [id], (err, deptDeleted) => {
      if (err){
        console.error(err);
        reject(err);
        return;
      }
      resolve();
    });
  });
}

const addNewDept = (newDeptData) => {
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO department set ?', newDeptData, (err, deptAdded) => {
      if (err){
        console.error(err);
        reject(err);
        return;
      }
      resolve();
    })
  });
}

module.exports = {
  viewAllEmp, getEmpRoles, queryEmpRole, getManagers, queryEmpManager, getEmpShort, updateEmpRole, updateEmpManager, addNewEmp, deleteEmp, 
  getRolesTable, getDepts, addNewRole, deleteRole, 
  getDeptSalaries, deleteDept, addNewDept
}