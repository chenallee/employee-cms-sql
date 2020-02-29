const rolesPrompt = [
  {
    name: 'roles_menu',
    message: `What would you like to do?`,
    type: 'list',
    choices: ['View Roles', 'Add Role', 'Delete Role'],
    default: 'View Roles'
  }
]


const renderRolesList = (rolesRes) => {
  return new Promise((resolve, reject) => {
    //console.log('gotroles');

    const rolesList = rolesRes.map((item) => {
      const formattedRole = { name: item.title, value: item.id };
      return formattedRole;
    });
    resolve(rolesList);
  });
};

module.exports = {
  rolesPrompt, renderRolesList
}