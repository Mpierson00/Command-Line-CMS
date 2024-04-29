const express = require('express');
const dbLib = require('./lib/database');

const app = express();
app.use(express.json());

app.get('/departments', async (req, res) => {
    const [departments] = await dbLib.getDepartments();
    res.json(departments);
});

app.post('/departments', async (req, res) => {
    const [result] = await dbLib.addDepartment(req.body.name);
    res.status(201).send(`Department added with ID: ${result.insertID}`);
});

app.listen(3001, () => {
    console.log('Server is running on port 3001')
});