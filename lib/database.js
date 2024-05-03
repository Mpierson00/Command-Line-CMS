const db = require('../db/connection');

// Get all departments from the database
const getDepartments = async () => {
    try {
        const [departments] = await db.query('SELECT * FROM department');
        return departments;
    } catch (error) {
        console.error('Error fetching departments:', error);
        throw error; // Rethrow to handle it at a higher level if needed
    }
};

// Add a new department to the database
const addDepartment = async (name) => {
    try {
        const [result] = await db.query('INSERT INTO department (name) VALUES (?)', [name]);
        return result.insertId; // Return the ID of the newly added department
    } catch (error) {
        console.error('Error adding department:', error);
        throw error;
    }
};

// Get all roles, including department information
const getRoles = async () => {
    try {
        const [roles] = await db.query('SELECT r.id, r.title, r.salary, d.name AS department FROM role r JOIN department d ON r.department_id = d.id');
        return roles;
    } catch (error) {
        console.error('Error fetching roles:', error);
        throw error;
    }
};

// Add a new role to the database
const addRole = async (title, salary, departmentId) => {
    try {
        const [result] = await db.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, departmentId]);
        return result.insertId; // Return the ID of the newly added role
    } catch (error) {
        console.error('Error adding role:', error);
        throw error;
    }
};

// Get all employees with their role and manager information
const getEmployees = async () => {
    try {
        const [employees] = await db.query(`SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary,
            CONCAT(m.first_name, ' ', m.last_name) AS manager FROM employee e
            LEFT JOIN role r ON e.role_id = r.id
            LEFT JOIN department d ON r.department_id = d.id
            LEFT JOIN employee m ON e.manager_id = m.id`);
        return employees;
    } catch (error) {
        console.error('Error fetching employees:', error);
        throw error;
    }
};

// Add a new employee to the database
const addEmployee = async (firstName, lastName, roleId, managerId) => {
    try {
        const [result] = await db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [firstName, lastName, roleId, managerId]);
        return result.insertId; // Return the ID of the newly added employee
    } catch (error) {
        console.error('Error adding employee:', error);
        throw error;
    }
};

// Update an employee's role
const updateEmployeeRole = async (employeeId, roleId) => {
    try {
        const [result] = await db.query('UPDATE employee SET role_id = ? WHERE id = ?', [roleId, employeeId]);
        return result.affectedRows; // Return the number of affected rows
    } catch (error) {
        console.error('Error updating employee role:', error);
        throw error;
    }
};

// Export all functions for use in other parts of the application
module.exports = {
    getDepartments,
    addDepartment,
    getRoles,
    addRole,
    getEmployees,
    addEmployee,
    updateEmployeeRole
};