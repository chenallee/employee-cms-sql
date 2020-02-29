// DEPENDENCIES
const inquirer = require('inquirer');
//const inquirer = require('enquirer');
require('console.table');

//import connection
const connection = require('./config/connection');

//import functions to work with database
const {
  viewAllEmp, getEmpRoles, queryEmpRole, getManagers, queryEmpManager, getEmpShort, updateEmpRole, updateEmpManager, addNewEmp, deleteEmp,
  getRolesTable, addNewRole, deleteRole,
  getDepts, getDeptSalaries, deleteDept, addNewDept
} = require('./lib/db-query');

//import questions
const menuPrompt = require('./lib/prompt');
const { employeesPrompt, empViewOptions, renderManagerList, renderEmpsList, updateEmpQ } = require('./lib/employee-prompt');
const { renderRolesList, rolesPrompt } = require('./lib/role-prompt');
const { renderDeptsList, deptsPrompt, addDeptQ } = require('./lib/department-prompt');

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
// *************************************===============================================================================================================================================
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

    //return to menu
    return entryPrompt();

    // View by Role
  } else if (empViewSelect === 'View by Role') {

    //query DB to get list of all roles
    const rolesRes = await getEmpRoles();
    //format response in a nice array to pass into choices
    const rolesList = await renderRolesList(rolesRes);

    //this would make more sense in renderRolesList but i was having issues bringing it over from there 
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

    //return to menu
    return entryPrompt();

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
    const empsByManager = await queryEmpManager(selectedManager);
    console.table(empsByManager);

    //return to menu
    return entryPrompt();
  }
};

// ====================================================================================================================================================================================
// User has selected to update employees:
//     user selects which employee to update
const updateEmpMenu = async () => {
  // user selects from choices of concat employee names (+ id)
  const empsRes = await getEmpShort();
  const empsList = await renderEmpsList(empsRes);
  //console.log(empsList);
  let empNamesQ =
    [
      {
        name: 'selected_emp',
        message: 'Select an Employee: ',
        type: 'list',
        choices: empsList
        //default: ''
      }
    ]
  //console.log(empNamesQ);
  const { selected_emp: selectedEmp } = await inquirer.prompt(empNamesQ);

  //console.log(selectedEmp);

  //ask user to update role or manager & pass thru empUpdateId
  const { update_select: selectedEmpUpdate } = await inquirer.prompt(updateEmpQ);


  if (selectedEmpUpdate === 'Role') {
    //if role ... user selects from choices of roles
    //get emp roles
    //query DB to get list of all roles
    const rolesRes = await getEmpRoles();
    //format response in a nice array to pass into choices
    const rolesList = await renderRolesList(rolesRes);
    //console.log(rolesList);

    //prompt user to select role
    let rolesQ =
      [
        {
          name: 'selected_role',
          message: 'Select new Role: ',
          type: 'list',
          choices: rolesList
        }
      ]

    const { selected_role: newRole } = await inquirer.prompt(rolesQ);

    //console.log(newRole);

    //UPDATE 'employees' set 'role_id' to role.id where id = selectedEmp.id
    updateEmpRole(newRole, selectedEmp);

    console.log(`Employee's Role Updated!`)
    return entryPrompt();
  } else if (selectedEmpUpdate === 'Manager') {
    //if manager user selects manager to assign from ALL employees
    // choices of concat employee names + id - get emp short

    let empNamesQ =
      [
        {
          name: 'selected_emp',
          message: 'Select new Manager: ',
          type: 'list',
          choices: empsList
          //default: ''
        }
      ]

    const { selected_emp: newManager } = await inquirer.prompt(empNamesQ);

    updateEmpManager(newManager, selectedEmp);

    console.log(`Employee's Manager Updated!`)
    return entryPrompt();
  }
}

// ====================================================================================================================================================================================
// User has selected to add employee:
const addEmpMenu = async () => {
  //get roles:
  const rolesRes = await getEmpRoles(); //query DB to get list of all roles
  const rolesList = await renderRolesList(rolesRes);   //format response in a nice array
  //get managers
  const empsRes = await getEmpShort();
  const empsList = await renderEmpsList(empsRes);

  const addEmpQ = [
    {
      name: 'first_name',
      message: 'Enter first name: ',
      type: 'input',
      validate: inputVal => (inputVal ? true : false)
    },
    {
      name: 'last_name',
      message: 'Enter last name: ',
      type: 'input',
      validate: inputVal => (inputVal ? true : false)
    },
    {
      name: 'role_id',
      message: `Select employee's role: `,
      type: 'list',
      choices: rolesList
    },
    {
      name: 'manager_id',
      message: `Select employee's manager: `,
      type: 'list',
      choices: empsList
    }
  ]

  const newEmpData = await inquirer.prompt(addEmpQ);
  //console.log(newEmpData);
  addNewEmp(newEmpData);
  console.log('Employee Added!');
  return entryPrompt();
}

// ====================================================================================================================================================================================
// User has selected to delete employee:
const delEmpMenu = async () => {
  //ask user to select an employee to delete from the list:
  const empsRes = await getEmpShort();
  const empsList = await renderEmpsList(empsRes);

  const delEmpQ = [
    {
      name: 'id',
      message: 'Select which employee to delete: ',
      type: 'list',
      choices: empsList
    }
  ]

  let { id: delEmp } = await inquirer.prompt(delEmpQ);
  //console.log(delEmp);

  deleteEmp(delEmp);

  console.log('Employee Deleted!');
  return entryPrompt();
}

// ====================================================================================================================================================================================
// User has selected Roles menu
// *************************************===============================================================================================================================================

//call Roles prompt which asks user if they want to View role/Add role/Delete role
// if View -> show all roles -> call Entry Prompt
// if Add call Add R prompts (title/salary/department from list)
//if Delete call Delete R prompts (list)
const rolesMenu = async () => {
  const { roles_menu: rolesAction } = await inquirer.prompt(rolesPrompt);

  if (rolesAction === 'View Roles') { // Display ID / Title / Salary / Dpt name
    viewRoles();
  } else if (rolesAction === 'Add Role') { //     if Add call Add R prompts (input Title/select Dpt)
    addRoleMenu();
  } else if (rolesAction === 'Delete Role') { //     if Delete call Delete R prompts
    delRoleMenu();
  }
}

// ====================================================================================================================================================================================
// User has selected to view roles:
const viewRoles = async () => {
  //query DB to get all necessary role data
  const fullRoles = await getRolesTable();
  console.table(fullRoles);

  //return to menu
  return entryPrompt();
}

// ====================================================================================================================================================================================
// User has selected to add role:
const addRoleMenu = async () => {
  //get dept id / name
  const deptsRes = await getDepts();
  //console.table(deptsRes); 
  const deptsList = await renderDeptsList(deptsRes);
  //console.log(deptsList);

  const addRoleQ = [
    {
      name: 'title',
      message: 'Enter title of new role: ',
      type: 'input',
      validate: inputVal => (inputVal ? true : false)
    },
    {
      name: 'salary',
      message: 'What is the salary for this role? ',
      type: 'input',
      validate: inputVal => {
        return inputVal > 0 && !isNaN(inputVal) ? true : false;
      }
    },
    {
      name: 'department_id',
      message: 'Which department does this role belong to? ',
      type: 'list',
      choices: deptsList
    }
  ]

  const newRoleData = await inquirer.prompt(addRoleQ);

  //console.log (newRoleData);
  addNewRole(newRoleData);
  console.log('Role Added!');

  return entryPrompt();
}


// ====================================================================================================================================================================================
// User has selected to delete role:
const delRoleMenu = async () => {
  //get roles (we don't need all the data so let's use this one:) --> if there's time make a more general query SELECT ? from ROLES and etc
  const rolesRes = await getEmpRoles(); //query DB to get list of all roles
  const rolesList = await renderRolesList(rolesRes);   //format response in a nice array

  const delRoleQ = [
    {
      name: 'id',
      message: 'Select which role to delete: ',
      type: 'list',
      choices: rolesList
    }
  ]

  let { id: delRole } = await inquirer.prompt(delRoleQ);
  //console.log(delEmp);

  //delRole = 9;

  deleteRole(delRole);

  console.log('Role Deleted!');
  return entryPrompt();

}

// ====================================================================================================================================================================================
// User has selected Departments menu
// *************************************===============================================================================================================================================

//call Departments prompt which asks user if they want to View Departments/View Department Budget/Add Dpt/Delete Dpt
//if View -> show all dpts -> call Entry Prompt
// if View Budget -> prompt to Select Dpt from List -> show budget
// if Add call Add D prompts (name)
// if Delete call Delete R prompts (list)
const departmentsMenu = async () => {
  const { depts_menu: deptsAction } = await inquirer.prompt(deptsPrompt);

  if (deptsAction === 'View Departments') { // Display ID / Title / Salary / Dpt name
    viewDepts();
  } else if (deptsAction === 'View Budget') {
    viewBudget();
  } else if (deptsAction === 'Add Department') { //     if Add call Add R prompts (input Title/select Dpt)
    addDeptMenu();
  } else if (deptsAction === 'Delete Department') { //     if Delete call Delete R prompts
    delDeptMenu();
  }
}

// ====================================================================================================================================================================================
// User has selected to view departments:
const viewDepts = async () => {
  //get dept id / name
  const deptsRes = await getDepts();
  console.table(deptsRes);

  return entryPrompt();
}

// ====================================================================================================================================================================================
// User has selected to view department's budget:
const viewBudget = async () => {
  const deptsRes = await getDepts();
  //console.table(deptsRes); 
  const deptsList = await renderDeptsList(deptsRes);

  const viewBudgetQ = [
    {
      name: 'id',
      message: `Select which Department's budget to view: `,
      type: 'list',
      choices: deptsList
    }
  ]

  const { id: deptSelected } = await inquirer.prompt(viewBudgetQ);

  const deptSalaries = await getDeptSalaries(deptSelected);

  let deptBudget = 0;

  deptSalaries.forEach(employee => {
    deptBudget = deptBudget + parseFloat(employee.salary);
  });

  console.log(`Departmental budget: ${deptBudget}`);
}

// ====================================================================================================================================================================================
// User has selected to add department:
const addDeptMenu = async () => {

  const newDeptData = await inquirer.prompt(addDeptQ);

  addNewDept(newDeptData);
  console.log('Department Added!');

  return entryPrompt();
}

const delDeptMenu = async () => {
  const deptsRes = await getDepts();
  //console.table(deptsRes); 
  const deptsList = await renderDeptsList(deptsRes);

  const delDeptQ = [
    {
      name: 'id',
      message: `Select which Department to delete: `,
      type: 'list',
      choices: deptsList
    }
  ]

  let { id: delDept } = await inquirer.prompt(delDeptQ);
  //delDept = 5;

  //console.log(delDept);

  deleteDept(delDept);
  console.log('Department Deleted!');

  return entryPrompt();
}

// ====================================================================================================================================================================================
//connect to the database
connection.connect(err => {
  if (err) throw err;
  //console.log('connected to DB');
  entryPrompt();
});
