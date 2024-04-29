const db = require('../db/connection');

// get all departments from the database
const getDepartments = async () => {
    return await db.query('SELECT * FROM department');
};
// add a new department to the database
const addDepartment = async (name) => {
    return await db.query('INSERT INTO department (name) VALUES (?)', [name]);
};
// get all roles, including department information
const getRoles = async () => {
    return await db.query('SELECT r.id, r.title, r.salary, d.name AS department FROM role r JOIN department d ON r.department_id = d.id');
  };

  // add a new role to the database
const addRole = async (title, salary, departmentId) => {
    return await db.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, departmentId]);
  };

  // get all employees with their role and manager information
const getEmployees = async () => {
    return await db.query(`SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary,
      CONCAT(m.first_name, ' ', m.last_name) AS manager FROM employee e
      LEFT JOIN role r ON e.role_id = r.id
      LEFT JOIN department d ON r.department_id = d.id
      LEFT JOIN employee m ON e.manager_id = m.id`);
  };

