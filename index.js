const inquirer = require('inquirer');
const {
  getDepartments,
  addDepartment,
  getRoles,
  addRole,
  getEmployees,
  addEmployee,
  updateEmployeeRole
} = require('./lib/database');

function mainMenu() {
  inquirer.prompt({
    type: 'list',
    name: 'action',
    message: 'What would you like to do?',
    choices: [
      'View All Departments',
      'Add Department',
      'View All Roles',
      'Add Role',
      'View All Employees',
      'Add Employee',
      'Update Employee Role',
      'Exit'
    ]
  }).then(({ action }) => {
    switch (action) {
      case 'View All Departments':
        viewDepartments();
        break;
      case 'Add Department':
        promptForDepartment();
        break;
      case 'View All Roles':
        viewRoles();
        break;
      case 'Add Role':
        promptForRole();
        break;
      case 'View All Employees':
        viewEmployees();
        break;
      case 'Add Employee':
        promptForEmployee();
        break;
      case 'Update Employee Role':
        promptForEmployeeRoleUpdate();
        break;
      case 'Exit':
        console.log('Goodbye!');
        process.exit();
    }
  });
}

async function viewDepartments() {
  const [departments] = await getDepartments();
  console.table(departments);
  mainMenu();
}

async function promptForDepartment() {
  const { name } = await inquirer.prompt({
    type: 'input',
    name: 'name',
    message: 'Enter the department name:'
  });
  await addDepartment(name);
  console.log('Department added successfully!');
  mainMenu();
}

async function viewRoles() {
  const [roles] = await getRoles();
  console.table(roles);
  mainMenu();
}
