// Import inquirer
const express = require('inquirer');
// Import and require mysql2
const mysql = require('mysql2');
// Import console.table
const cTable = require('console.table');



// Connection to MySQL database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'PlumKeyKey',
    database: 'employees'
}, 
console.log(`Connected to the employee database.`)
);

connection.connect(err => {
    if (err) throw err;
    prompt();
});
