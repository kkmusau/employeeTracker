import inquirer from "inquirer";
import cTable from "console.table";
import db from "./config/connection.js";

// const showDepartments = () => {
//     db.query('SELECT * FROM department;').then((err,res) => {
//         if (err) throw err;
//         // Print data retrieved to terminal in table format
//         console.table(res);
//     });
// };


function showDepartments() {
  // SQL command to select data from department table
  let query = "SELECT * FROM department";
  // Connect to MySQL using query instruction to access department table
  db.query(query, function (err, res) {
    // If there is an error, throw error
    if (err) throw err;
    // Print data retrieved to terminal in table format
    console.table(res);
    init();
  });
}

function showRoles() {
  let query = "SELECT * FROM role";
  db.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    init();
  });
}

function showEmployees() {
  let query = "SELECT * FROM employee";
 db.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    init();
    });
}

function addDepartment() {
    inquirer.prompt({     
        type: "input",
        message: "What department do you want to add?",
        name: "addDept"

    }).then(function(answer){
        db.query("INSERT INTO department (name) VALUES (?)", [answer.addDept] , function(err, res) {
            if (err) throw err;
            console.table(res);
            init();
    })
    })
}

const init = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "task",
        message: "What would you like to do?",
        choices: [
          "View All Departments",
          "View All Roles",
          "View All Employees",
          "Add a Department",
          "Add a Role",
          "Add an Employee",
          "Update an Employee Role",
        ],
      },
    ])
    .then(({ task }) => {
      task == "View All Departments"
        ? showDepartments()
        : task == "View All Roles"
        ? showRoles()
        : task == "View All Employees"
        ? showEmployees()
        : task == "Add a Department"
        ? addDepartment()
        : task == "Add a Role"
        ? addRole()
        : task == "Add an Employee"
        ? addEmployee()
        : updateEmployeeRole();
    });
};

showDepartments();
