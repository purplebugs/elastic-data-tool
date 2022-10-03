import mysql from "mysql2";

// create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "poodle",
  database: "anita_database",
});

// simple query
connection.query(
  "SELECT * FROM `alp_Location`",
  function (err, results, fields) {
    console.log("err", err);
    console.log("results", results); // results contains rows returned by server
    //console.log(fields); // fields contains extra meta data about results, if available
  }
);
