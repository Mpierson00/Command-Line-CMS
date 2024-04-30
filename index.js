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
async function promptForRole() {
  const departments = await getDepartments();
  const departmentChoices = departments.map(dept => ({ name: dept.name, value: dept.id }));
  const { title, salary, department_id } = await inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Enter the role title:'
    },
    {
      type: 'input',
      name: 'salary',
      message: 'Enter the salary for the role:'
    },
    {
      type: 'list',
      name: 'department_id',
      message: 'Select the department:',
      choices: departmentChoices
    }
  ]);
  await addRole(title, salary, department_id);
  console.log('Role added successfully!');
  mainMenu();
}

async function viewEmployees() {
  const [employees] = await getEmployees();
  console.table(employees);
  mainMenu();
}

async function promptForEmployee() {
  const roles = await getRoles();
  const roleChoices = roles.map(role => ({ name: role.title, value: role.id }));
  const managers = await getEmployees();
  const managerChoices = managers.map(manager => ({ name: `${manager.first_name} ${manager.last_name}`, value: manager.id}));
  managerChoices.unshift({ name: 'No Manager', value: null });
  const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
    {
      type: 'input',
      name: 'first_name',
      message: 'Enter the employee\'s first name:'
    },
    {
      type: 'input',
      name: 'last_name',
      message: 'Enter the employee\'s last name:'
    },
    {
      type: 'list',
      name: 'role_id',
      message: 'Select the role:',
      choices: roleChoices
    },
    {
      type: 'list',
      name: 'manager_id',
      message: 'Select the manager:',
      choices: managerChoices
    }
  ]);
  await addEmployee(first_name, last_name, role_id, manager_id);
  console.log('Employee added successfully!');
  mainMenu();
}

async function promptForEmployeeRoleUpdate() {
  const employees = await getEmployees();
  const employeeChoices = employees.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }));
  const roles = await getRoles();
  const roleChoices = roles.map(role => ({ name: role.title, value: role.id }));

  const { employee_id, role_id } = await inquirer.prompt([
    {
      type: 'list',
      name: 'employee_id',
      message: 'Select the employee to update:',
      choices: employeeChoices
    },
    {
      type: 'list',
      name: 'role_id',
      message: 'Select the new role:',
      choices: roleChoices
    }
  ]);
  await updateEmployeeRole(employee_id, role_id);
  console.log('Employee role updated successfully!');
  mainMenu();
}

mainMenu();