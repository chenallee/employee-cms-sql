const { getEmpRoles, viewEmpRoles } = require('./db-query');
//const { viewEmpRoles } = require('../app');

const employeesPrompt = [
  {
    name: 'employees_menu',
    message: `What would you like to do?`,
    type: 'list',
    choices: ['View Employees', 'Update Employee', 'Add Employee', 'Delete Employee'],
    default: 'View Employees'
  }
]

const empViewOptions = [
  {
    name: 'employees_view',
    message: `How would you like to view employees?`,
    type: 'list',
    choices: ['View All', 'View by Role', 'View by Manager'],
    default: 'View All'
  }
]

const updateEmpQ = [
  {
    name: 'update_select',
    message: `Update this employee by Role or Manager? `,
    type: 'list',
    choices: ['Role', 'Manager'],
    default: 'Manager'
  }
]

const renderEmpRolesList = (rolesRes) => {
  return new Promise((resolve, reject) => {
    //console.log('gotroles');

    const empRoles = rolesRes.map((item) => {
      const formattedRole = { name: item.title, value: item.id };
      return formattedRole;
    });
    resolve(empRoles);
  });
};

const renderManagerList = (managersRes) => {
  return new Promise((resolve, reject) => {

    const managersList = managersRes.map((item) => {
      const formattedManager = { name: item.manager, value: item.id };
      return formattedManager;
    });
    resolve(managersList);
  });
};

const renderEmpsList = (empsRes) => {
  return new Promise((resolve, reject) => {

    const EmpsList = empsRes.map((item) => {
      const formattedEmp = { name: item.name, value: item.id };
      return formattedEmp;
    });
    resolve(EmpsList);
  });
};





module.exports = { employeesPrompt, empViewOptions, renderEmpRolesList, renderManagerList, renderEmpsList, updateEmpQ }