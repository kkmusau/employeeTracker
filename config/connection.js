import mysql from "mysql2";

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