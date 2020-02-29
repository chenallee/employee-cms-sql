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
  renderDeptsList
}