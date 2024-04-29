const db = require('../db/connection');

// get all departments from the database
const getDepartments = async () => {
    const [departments] = await db.query('SELECT * FROM department');
    return departments;
  };
  
  // add a new department to the database
  const addDepartment = async (name) => {
    const [result] = await db.query('INSERT INTO department (name) VALUES (?)', [name]);
    return result.insertId; // return the ID of the newly added department
  };
  
  // get all roles, including department information
  const getRoles = async () => {
    const [roles] = await db.query('SELECT r.id, r.title, r.salary, d.name AS department FROM role r JOIN department d ON r.department_id = d.id');
    return roles;
  };
  
  // add a new role to the database
  const addRole = async (title, salary, departmentId) => {
    const [result] = await db.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, departmentId]);
    return result.insertId; // return the ID of the newly added role
  };
  
  // get all employees with their role and manager information
  const getEmployees = async () => {
    const [employees] = await db.query(`SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary,
      CONCAT(m.first_name, ' ', m.last_name) AS manager FROM employee e
      LEFT JOIN role r ON e.role_id = r.id
      LEFT JOIN department d ON r.department_id = d.id
      LEFT JOIN employee m ON e.manager_id = m.id`);
    return employees;
  };
  
  // add a new employee to the database
  const addEmployee = async (firstName, lastName, roleId, managerId) => {
    const [result] = await db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [firstName, lastName, roleId, managerId]);
    return result.insertId; // return the ID of the newly added employee
  };
  
  // update an employee's role
  const updateEmployeeRole = async (employeeId, roleId) => {
    const [result] = await db.query('UPDATE employee SET role_id = ? WHERE id = ?', [roleId, employeeId]);
    return result.affectedRows; // return the number of affected rows
  };

// export all functions for use in other parts of the application
module.exports = {
    getDepartments,
    addDepartment,
    getRoles,
    addRole,
    getEmployees,
    addEmployee,
    updateEmployeeRole
};