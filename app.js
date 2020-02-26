// DEPENDENCIES
const inquirer = require('inquirer');
require('console.table');

//import connection
const connection = require('./config/connection');



//welcome user with initial screen
  //call entry prompt function

//entry prompt function:
  //have user select if they want to interact with Employees / Roles / Departments
    //if Employees call Employees menu 
    //if Roles call Roles menu


//call Employees prompt which asks user if they want to View/Update/Add/Delete
  //if View call View menu
    //View menu asks if user wants to View All E / View E by Role / View E by Manager/ (View E by Dpt)
  //if Update call Update menu
    //Update menu asks if user wants to Update Role / Update Manager
  //if Add call Add E prompts (name/surname/role from list/manager from list)*
  //if Delete call Delete E prompts

//call Roles prompt which asks user if they want to View role/Add role/Delete role
  // if View -> show all roles -> call Entry Prompt
  // if Add call Add R prompts (title/salary/department from list)
  //if Delete call Delete R prompts (list)

//call Departments prompt which asks user if they want to View Departments/View Department Budget/Add Dpt/Delete Dpt
  //if View -> show all dpts -> call Entry Prompt
  // if View Budget -> prompt to Select Dpt from List -> show budget
  // if Add call Add D prompts (name)
  // if Delete call Delete R prompts (list)

// *** uh do we have a separate manager DB? that allows user to select maanager or...***

//connect to the database
connection.connect(err => {
  if (err) throw err;
  console.log('connected to DB');
})