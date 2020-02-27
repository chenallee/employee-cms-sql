// DEPENDENCIES
const inquirer = require('inquirer');
require('console.table');

//import connection
const connection = require('./config/connection');

//import functions to work with database
const { viewAllEmp, getEmpRoles, queryEmpRole, getManagers, queryEmpManager } = require('./lib/db-query');

//import questions
const menuPrompt = require('./lib/prompt');
const { employeesPrompt, empViewOptions, renderEmpRolesList, renderManagerList } = require('./lib/employee-prompt');

// ====================================================================================================================================================================================
//   functions
// ====================================================================================================================================================================================

//welcome user with initial screen
//call entry prompt function

/*entry prompt function:
  Have user select if they want to interact with Employees / Roles / Departments
    --> if Employees call Employees menu 
    --> if Roles call Roles menu 
    --> if Departments call Departments menu */
const entryPrompt = async () => {

  const { selected_menu: menuSelect } = await inquirer.prompt(menuPrompt);

  if (menuSelect === 'Employees') {
    employeesMenu();
  } else if (menuSelect === 'Roles') {
    rolesMenu();
  } else if (menuSelect === 'Departments') {
    departmentsMenu();
  } else {
    connection.end();
  }
  ;
}
// ====================================================================================================================================================================================
// User has selected the Employees menu:

//     call Employees prompt which asks user if they want to View/Update/Add/Delete
//     if View call View menu
//     if Update call Update menu
//     if Add call Add E prompts (name/surname/role from list/manager from list)*
//     if Delete call Delete E prompts

const employeesMenu = async () => {
  //console.log('employees');
  const { employees_menu: employeesAction } = await inquirer.prompt(employeesPrompt);

  if (employeesAction === 'View Employees') { //          View menu asks if user wants to View All E / View E by Role / View E by Manager/ (View E by Dpt)
    viewEmpMenu();
  } else if (employeesAction === 'Update Employee') { //          Update menu asks if user wants to Update Role / Update Manager
    updateEmpMenu();
  } else if (employeesAction === 'Add Employee') { //     if Add call Add E prompts (name/surname/role from list/manager from list)*
    addEmpMenu();
  } else if (employeesAction === 'Delete Employee') { //     if Delete call Delete E prompts
    delEmpMenu();
  }
};

// ====================================================================================================================================================================================
// User has selected to view employees:
//     user selects to view all / view by role / view by manager

const viewEmpMenu = async () => {

  // ask user to select how they want to view employees
  const { employees_view: empViewSelect } = await inquirer.prompt(empViewOptions);

  // View All:
  if (empViewSelect === 'View All') {

    //query DB to get all necessary employee data
    const allEmps = await viewAllEmp();
    console.table(allEmps);

    // View by Role
  } else if (empViewSelect === 'View by Role') {

    //query DB to get list of all roles
    const rolesRes = await getEmpRoles();
    //format response in a nice array to pass into choices
    const rolesList = await renderEmpRolesList(rolesRes);

    //this would make more sense in renderEmpRolesList but i was having issues bringing it over from there 
    let rolesQ =
      [
        {
          name: 'selected_role',
          message: 'Search by: ',
          type: 'list',
          choices: rolesList
          //default: 'Lawyer'
        }
      ]

    const { selected_role: selectedRole } = await inquirer.prompt(rolesQ);
    //console.log(selectedRole);

    //get employees by role selected -> db query
    const empsByRole = await queryEmpRole(selectedRole);
    console.table(empsByRole);

  } else if (empViewSelect === 'View by Manager') {

    //query DB to get manager list
    const managerRes = await getManagers();
    //console.log(managerRes);
    //format response in a nice array to pass into choices
    const managersList = await renderManagerList(managerRes);
    //console.log(managersList);

    let managersQ =
      [
        {
          name: 'selected_manager',
          message: 'Search by: ',
          type: 'list',
          choices: managersList
          //default: 1
        }
      ]

    //console.log(managersQ)
    const { selected_manager: selectedManager } = await inquirer.prompt(managersQ);

    //get employees by manager selected -> db query
    const empsByManager= await queryEmpManager(selectedManager);
    console.table(empsByManager);

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


// ====================================================================================================================================================================================
//connect to the database
connection.connect(err => {
  if (err) throw err;
  //console.log('connected to DB');
  entryPrompt();
});
