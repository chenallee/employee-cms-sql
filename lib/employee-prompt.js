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
    default: 'View by Manager'
  }
]

const renderEmpRolesList = (rolesRes) => {
  return new Promise ((resolve, reject) => {
    //console.log('gotroles');

    const empRoles = rolesRes.map((item) => {
      const formattedRole = `${item.title}`
      return formattedRole;
    });
    resolve(empRoles);
  }); 
};

const renderManagerList = (managersRes) => {
  return new Promise ((resolve, reject) => {

    const managersList = managersRes.map((item) => {
      const formattedManager = {name: item.manager, value: item.id};
      return formattedManager;
    });
    resolve(managersList);
  }); 
};





module.exports = {employeesPrompt, empViewOptions, renderEmpRolesList, renderManagerList}