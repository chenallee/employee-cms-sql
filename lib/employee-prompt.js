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
    //are these grouped by role/manager? or select role/manager and show those?
  // *** uh do we have a separate manager DB? that allows user to select maanager or...***
  }
]

module.exports = {employeesPrompt, empViewOptions}