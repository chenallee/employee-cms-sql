const rolesPrompt = [
  {
    name: 'roles_menu',
    message: `What would you like to do?`,
    type: 'list',
    choices: ['View Roles', 'Add Role', 'Delete Role'],
    //default: 'Delete Role'
  }
]


const renderRolesList = (rolesRes) => {
  //console.log('gotroles');

  const rolesList = rolesRes.map((item) => {
    const formattedRole = { name: item.title, value: item.id };
    return formattedRole;
  });
  return rolesList
};

module.exports = {
  rolesPrompt, renderRolesList
}