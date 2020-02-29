const deptsPrompt =[
  {
    name: 'depts_menu',
    message: `What would you like to do?`,
    type: 'list',
    choices: ['View Departments', 'View Budget', 'Add Department', 'Delete Department'],
    default: 'View Budget'
  }
]

const renderDeptsList = (deptsRes) => {
  // return new Promise((resolve, reject) => {
  //   resolve(deptList);
  // });
  const deptList = deptsRes.map((item) => {
    const formattedDept = { name: item.name, value: item.id };
    return formattedDept;
  });
  return deptList;
};

module.exports = {
  renderDeptsList, deptsPrompt
}