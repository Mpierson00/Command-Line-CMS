const db = require('../db/connection');

// Retrieve all departments from the database
const getDepartments = async () => {
    return await db.query('SELECT * FROM department');
};
// Add a new department to the database
const addDepartment = async (name) => {
    return await db.query('INSERT INTO department (name) VALUES (?)', [name]);
};
// Retrieve all roles, including department information
const getRoles = async () => {
    return await db.query('SELECT r.id, r.title, r.salary, d.name AS department FROM role r JOIN department d ON r.department_id = d.id');
  };

  