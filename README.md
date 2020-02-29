# employee-cms-sql

## description
This app is a content management system run through the command-line that allows users to interface with a company employee database. There is CRUD operations available for all three tables in the database (Employees, Roles, Departments).

## installation
This app depends on the node packages express, inquirer, dotenv, and console.table and uses data from a SQL database. Once node is installed, make sure the app's directory is open in the command line before using the command `npm install` for all required node dependencies. 

Before running the app make sure to set up the database. You can simply run the schema.sql and then the seeds.sql files in MySQL Workbench to set this up.

To start the app just use the command `npm start` in the command line.

## usage
To start the app just use the command `npm start` in the command line.

Here's how the application flows:

Employees
* View 
  * View All - see a table of all Employees 
  * View by Role - Select a Role from List and see a table of all Employees matching Seletced Role
  * View by Manager - Select a Manager from List and see a table of all Employees directly under Selected Manager

* Update - Select which Employee to Update from List then Choose Either:
  * Update Role - Select a New Role from List
  * Update Manager - Select a New Manager from List

* Add - Input First Name, Last Name, Select Role from List and Manager from List
* Delete - Select which Employee to Delete from List

Roles
* View - see a table of all Roles
* Add - Input Title, Salary, Select Department from List
* Delete - Select which Role to Delete from List

Departments
* View - see a table of all Departments
* View Budget - Select a Department from List and see the Total Budget (combines salary off all employees in department)
* Add - Input Name
* Delete - Select which Department to Delete from List

Exit - Exits application


## final thoughts
As with every new lesson, I'm trying to learn by implementation which sometimes leads to overuse. One thing I probably overused here is promises and async/await. I'm starting to understand it a little bit better, so I think as I play around with new ways of writing asynchronous code I can learn how to better implement it.

This app, especially in the app.js file, ended up being a lot more lines of code than I had anticipated. Because of that I am really starting to see the importance of writing less but more efficient code.

There are lots of ways I can rewrite the code to be less repetitive, one of which is writing more general SQL queries. Another is that I reused all but a few context-specific words in some similar functions, like the delete functions. I could have constructed classes for each table and extended their methods. Rather than two separate queries for selecting different . I'd like to go back and implement these rewrites. Although I planned out the app ahead of time, I didn't fully understand everything I'd need to do until I started writing the code so it was only then that I realized I could rewrite it to be less repetitive. I feel like I am in a better place to both plan better and be more flexible in changing things in the future. 