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

// function to add a department
function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "addDept",
        message: "What department do you want to add?",
        validate: (addDept) => {
          if (addDept) {
            return true;
          } else {
            console.log("Please enter a department");
            return false;
          }
        },
      },
    ])
    .then((answer) => {
      const sql = `INSERT INTO department (department_name) VALUES (?)`;
      db.query(sql, answer.addDept, (err, result) => {
        if (err) throw err;
        console.log("Added " + answer.addDept + " to departments!");

        showDepartments();
      });
    });
}

async function addRole() {
  let options = await db
    .promise()
    .query("SELECT id, department_name FROM department")
    .then((result) =>
      result[0].map((obj) => {
        return {
          name: Object.values(obj)[1],
          value: Object.values(obj)[0],
        };
      })
    );

  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "What role do you want to add?",
        validate: (addRole) => {
          if (addRole) {
            return true;
          } else {
            console.log("Please enter a role");
            return false;
          }
        },
      },
      {
        type: "number",
        name: "salary",
        message: "What is the salary?",
      },
      {
        type: "list",
        name: "department_id",
        message: "For which department does this role belong to?",
        choices: options,
      },
    ])
    .then(({ title, salary, department_id }) => {
      const sql = `INSERT INTO role (title, salary, department_id ) VALUES (?,?,?)`;
      db.query(sql, [title, salary, department_id], (err, result) => {
        if (err) throw err;
        console.log("Added " + title + " to role!");

        showDepartments();
      });
    });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What's the first name of the employee?",
        name: "FirstName",
      },
      {
        type: "input",
        message: "What's the last name of the employee?",
        name: "LastName",
      },
      {
        type: "input",
        message: "What is the employee's role id number?",
        name: "roleID",
      },
      {
        type: "input",
        message: "What is the manager id number?",
        name: "managerID",
      },
    ])
    .then(function (answer) {
      db.query(
        "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
        [answer.FirstName, answer.LastName, answer.roleID, answer.managerID],
        function (err, res) {
          if (err) throw err;
          console.table(res);
          init();
        }
      );
    });
}

function updateEmployeeRole() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Which employee would you like to update?",
        name: "employeeUpdate",
      },

      {
        type: "input",
        message: "What do you want to update to?",
        name: "updateRole",
      },
    ])
    .then(function (answer) {
      db.query(
        "UPDATE employee SET role_id=? WHERE first_name= ?",
        [answer.updateRole, answer.employeeUpdate],
        function (err, res) {
          if (err) throw err;
          console.table(res);
          showDepartments();
        }
      );
    });
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

// showDepartments();
addEmployee();
