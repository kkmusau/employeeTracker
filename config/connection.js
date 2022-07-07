import mysql from "mysql2";

//Creates a connection to sql database
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "PlumKeyKey",
    database: "employee_db",
  },
  console.log(`Connected to the employee database.`)
);

export default db;