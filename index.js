import inquirer from 'inquirer';
import cTable from 'console.table';
import db from './config/connection.js';

const showDepartments = () => {
    db.promise().query('SELECT * FROM department;').then((err,res) => {
        if (err) throw err;
        // Print data retrieved to terminal in table format
        console.table(res);
    });
};


const init = () => {
    inquirer.prompt([

        {
            type: 'list',
            name: 'task',
            message: 'What would you like to do?',
            choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role']
        }
    ]).then(({task}) => {
        task == 'View All Departments'
        ? showDepartments()
        : task == 'View All Roles'
        ? showRoles()
        : task == 'View All Employees'
        ? showEmployees()
        : task == 'Add a Department'
        ? addDepartment()
        : task == 'Add a Role'
        ? addRole()
        : task == 'Add an Employee'
        ? addEmployee()
        : updateEmployeeRole()
    })    
};

showDepartments()

