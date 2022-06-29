const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');


// Connection to database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employees'
}, 
console.log(`Connected to the employee database.`)
);
