const db = require("./db/connection");
const express = require("express");
const PORT = process.env.port || 3001;
const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(( req, res) => {
    res.status(404).end();
});