const db = require('../db/connection');

const getDepartments = async () => {
    return await db.query('SELECT * FROM department');
};