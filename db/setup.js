const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

require('dotenv').config();

async function runScript() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        multipleStatements: true
    });

    try {
        // read and execute schema.sql
        const schemaSql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf-8');
        await connection.query(schemaSql);
        console.log('Database schema has been set up.');

        // read and execute seeds.sql
        const seedsSql = fs.readFileSync(path.join(__dirname, 'seeds.sql'), 'utf-8');
        await connection.query(seedsSql);
        console.log('Database has been seeded.');
        
    } finally {
        await connection.end();
    }
}

runScript().catch(err => console.error(err));