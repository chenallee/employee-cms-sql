const deptsPrompt =[
  {
    name: 'depts_menu',
    message: `What would you like to do?`,
    type: 'list',
    choices: ['View Departments', 'View Budget', 'Add Department', 'Delete Department'],
    //default: 'Add Department'
  }
]

const addDeptQ = [
  {
    name: 'name',
    message: `Enter name for new Department: `,
    type: 'input',
    validate: inputVal => (inputVal ? true: false)
  }
]

const renderDeptsList = (deptsRes) => {
  const deptList = deptsRes.map((item) => {
    const formattedDept = { name: item.name, value: item.id };
    return formattedDept;
  });
  return deptList;
};

module.exports = {
  renderDeptsList, deptsPrompt, addDeptQ
}