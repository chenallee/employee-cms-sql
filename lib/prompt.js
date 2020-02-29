const menuPrompt = [
  {
    name: 'selected_menu',
    message: 'Select a menu: ',
    type: 'list',
    choices: ['Employees', 'Roles', 'Departments', 'Exit'],
    default: 'Departments'
  }
]

module.exports = menuPrompt;