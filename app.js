// DEPENDENCIES
const inquirer = require('inquirer');
require('console.table');

//import connection
const connection = require('./config/connection');

//
const { viewAllEmp } = require('./lib/db-query');

//import questions
const menuPrompt = require('./lib/prompt');
const { employeesPrompt, empViewOptions } = require('./lib/employee-prompt');


//welcome user with initial screen
  //call entry prompt function

/*entry prompt function:
  Have user select if they want to interact with Employees / Roles / Departments
    --> if Employees call Employees menu 
    --> if Roles call Roles menu 
    --> if Departments call Departments menu */
const entryPrompt = async () => {

  const { selected_menu: menuSelect } = await inquirer.prompt(menuPrompt);

  if (menuSelect === 'Employees'){
    employeesMenu();
  } else if (menuSelect === 'Roles'){
    rolesMenu();
  } else if (menuSelect === 'Departments'){
    departmentsMenu();
  } else {
    connection.end();
  }
;}

//call Employees prompt which asks user if they want to View/Update/Add/Delete
  //if View call View menu
    //View menu asks if user wants to View All E / View E by Role / View E by Manager/ (View E by Dpt)
  //if Update call Update menu
    //Update menu asks if user wants to Update Role / Update Manager
  //if Add call Add E prompts (name/surname/role from list/manager from list)*
  //if Delete call Delete E prompts
const employeesMenu = async () => {
  //console.log('employees');
  const { employees_menu: employeesAction } = await inquirer.prompt(employeesPrompt);

  if (employeesAction === 'View Employees'){
    viewEmpMenu();
  } else if (employeesAction === 'Update Employee'){
    updateEmpMenu();
  } else if (employeesAction === 'Add Employee'){
    addEmpMenu();
  } else if (employeesAction === 'Delete Employee'){
    delEmpMenu();
  }
};

//View menu asks if user wants to View All E / View E by Role / View E by Manager/ (View E by Dpt)
const viewEmpMenu = async() => {
  console.log('view');
  const { employees_view: empViewSelect } = await inquirer.prompt(empViewOptions);

  if (empViewSelect === 'View All'){
    const allEmps = await viewAllEmp();
    console.table(allEmps);
  } else if (empViewSelect === 'View by Role'){
    console.log('roles');
  }

};

//call Roles prompt which asks user if they want to View role/Add role/Delete role
  // if View -> show all roles -> call Entry Prompt
  // if Add call Add R prompts (title/salary/department from list)
  //if Delete call Delete R prompts (list)

//call Departments prompt which asks user if they want to View Departments/View Department Budget/Add Dpt/Delete Dpt
  //if View -> show all dpts -> call Entry Prompt
  // if View Budget -> prompt to Select Dpt from List -> show budget
  // if Add call Add D prompts (name)
  // if Delete call Delete R prompts (list)



//connect to the database
connection.connect(err => {
  if (err) throw err;
  console.log('connected to DB');
  entryPrompt();
})