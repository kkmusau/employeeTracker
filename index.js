import inquirer from 'inquirer';
import cTable from 'console.table';
import db from './config/connection.js';

const showDepartments = () => {
    db.promise().query(`SELECT * FROM "departments"`).then((err,res) => {
        if (err) throw err;
        console.table(res);
    });
};

const init = () => {
    inquirer.prompt([

        {
            type: 'list',
            name: 'task',
            message: 'What would you like to do?',
            choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role']
        }
    ]).then(({task}) => {
        task == 'view all departments'
        ? showDepartments()
        : task == 'view all roles'
        ? showRoles()
        : task == 'view all employees'
        ? showEmployees()
        : task == 'add a department'
        ? addDepartment()
        : task == 'add a role'
        ? addRole()
        : task == 'add an employee'
        ? addEmployee()
        : updateEmployeeRole()
    })    
};

showDepartments()

