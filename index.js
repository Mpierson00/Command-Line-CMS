// Import the Inquirer library to handle user input from the command line
const inquirer = require('inquirer');

// Import the database functions from the database.js file
const {
    getDepartments,
    addDepartment,
    getRoles,
    addRole,
    getEmployees,
    addEmployee,
    updateEmployeeRole
} = require('./lib/database');

// Function to display the main menu to the user
function mainMenu() {
    // Prompt the user to choose an action
    inquirer.prompt({
        type: 'list',  // Use a list prompt to show options
        name: 'action',  // Store the user's choice in the 'action' variable
        message: 'What would you like to do?',  // Prompt message
        choices: [  // Options available to the user
            'View All Departments',
            'Add Department',
            'View All Roles',
            'Add Role',
            'View All Employees',
            'Add Employee',
            'Update Employee Role',
            'Exit'
        ]
    }).then(({ action }) => {  // Handle the user's choice
        switch (action) {
            case 'View All Departments':
                viewDepartments();  // View all departments
                break;
            case 'Add Department':
                promptForDepartment();  // Add a new department
                break;
            case 'View All Roles':
                viewRoles();  // View all roles
                break;
            case 'Add Role':
                promptForRole();  // Add a new role
                break;
            case 'View All Employees':
                viewEmployees();  // View all employees
                break;
            case 'Add Employee':
                promptForEmployee();  // Add a new employee
                break;
            case 'Update Employee Role':
                promptForEmployeeRoleUpdate();  // Update an employee's role
                break;
            case 'Exit':
                // Confirm with the user before exiting
                inquirer.prompt({
                    type: 'confirm',
                    name: 'confirmExit',
                    message: 'Are you sure you want to exit?',
                }).then(({ confirmExit }) => {
                    if (confirmExit) {
                        console.log('Goodbye!');
                        process.exit();  // Exit the program
                    } else {
                        mainMenu();  // Go back to the main menu
                    }
                });
                break;
        }
    }).catch(error => {
        console.error('An error occurred:', error);  // Log any errors
        mainMenu();  // Return to the main menu in case of an error
    });
}

// Function to view all departments and return to the main menu
async function viewDepartments() {
    try {
        const departments = await getDepartments();  // Get departments from the database
        console.table(departments);  // Display departments in table format
    } catch (error) {
        console.error('Error viewing departments:', error);  // Log any errors
    }
    mainMenu();  // Return to the main menu
}

// Function to prompt for department information and add a new department
async function promptForDepartment() {
    try {
        // Prompt the user to enter the department name
        const { name } = await inquirer.prompt({
            type: 'input',
            name: 'name',
            message: 'Enter the department name:'
        });
        await addDepartment(name);  // Add the department to the database
        console.log('Department added successfully!');
    } catch (error) {
        console.error('Error adding department:', error);  // Log any errors
    }
    mainMenu();  // Return to the main menu
}

// Function to view all roles and return to the main menu
async function viewRoles() {
    try {
        const roles = await getRoles();  // Get roles from the database
        console.table(roles);  // Display roles in table format
    } catch (error) {
        console.error('Error viewing roles:', error);  // Log any errors
    }
    mainMenu();  // Return to the main menu
}

// Function to prompt for role information and add a new role
async function promptForRole() {
    try {
        const departments = await getDepartments();  // Get departments for selection
        const departmentChoices = departments.map(dept => ({ name: dept.name, value: dept.id }));  // Convert departments to choices
        // Prompt the user to enter role details
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
        await addRole(title, salary, department_id);  // Add the role to the database
        console.log('Role added successfully!');
    } catch (error) {
        console.error('Error adding role:', error);  // Log any errors
    }
    mainMenu();  // Return to the main menu
}

// Function to view all employees and return to the main menu
async function viewEmployees() {
    try {
        const employees = await getEmployees();  // Get employees from the database
        console.table(employees);  // Display employees in table format
    } catch (error) {
        console.error('Error viewing employees:', error);  // Log any errors
    }
    mainMenu();  // Return to the main menu
}

// Function to prompt for employee information and add a new employee
async function promptForEmployee() {
    try {
        const roles = await getRoles();  // Get roles for selection
        const roleChoices = roles.map(role => ({ name: role.title, value: role.id }));  // Convert roles to choices
        const managers = await getEmployees();  // Get employees to select as managers
        const managerChoices = managers.map(manager => ({ name: `${manager.first_name} ${manager.last_name}`, value: manager.id }));  // Convert managers to choices
        managerChoices.unshift({ name: 'No Manager', value: null });  // Add 'No Manager' option

        // Prompt the user to enter employee details
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
        await addEmployee(first_name, last_name, role_id, manager_id);  // Add the employee to the database
        console.log('Employee added successfully!');
    } catch (error) {
        console.error('Error adding employee:', error);  // Log any errors
    }
    mainMenu();  // Return to the main menu
}

// Function to prompt for employee and role information and update an employee's role
async function promptForEmployeeRoleUpdate() {
    try {
        const employees = await getEmployees();  // Get employees for selection
        const employeeChoices = employees.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }));  // Convert employees to choices
        const roles = await getRoles();  // Get roles for selection
        const roleChoices = roles.map(role => ({ name: role.title, value: role.id }));  // Convert roles to choices

        // Prompt the user to select an employee and a new role
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
        await updateEmployeeRole(employee_id, role_id);  // Update the employee's role in the database
        console.log('Employee role updated successfully!');
    } catch (error) {
        console.error('Error updating employee role:', error);  // Log any errors
    }
    mainMenu();  // Return to the main menu
}

// Start the application
mainMenu();