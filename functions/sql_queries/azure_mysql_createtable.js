import dotenv from "dotenv";
const configuration = dotenv.config();
import mysql2 from "mysql2";
import { readFileSync } from "fs";

// Ref: https://learn.microsoft.com/en-us/azure/mysql/single-server/connect-nodejs - though do not get certificate from here

// Get certificate from https://portal.azure.com/ MySQL flexible server > Settings > Networking > Download SSL Certificate and store in ./data folder

let config = {
  host: process.env.MYSQL_AZURE_HOST,
  user: process.env.MYSQL_AZURE_USER,
  password: process.env.MYSQL_AZURE_PASSWORD,
  database: process.env.MYSQL_AZURE_TEST_DATABASE,
  port: 3306,
  ssl: {
    ca: readFileSync(`./data/${process.env.MYSQL_AZURE_CERTIFICATE}`),
  },
};

const conn = new mysql2.createConnection(config);

conn.connect(function (err) {
  if (err) {
    console.log("!!! Cannot connect !!! Error:");
    throw err;
  } else {
    console.log("Connection established.");
    queryDatabase();
  }
});

function queryDatabase() {
  conn.query(
    "DROP TABLE IF EXISTS inventory;",
    function (err, results, fields) {
      if (err) throw err;
      console.log("Dropped inventory table if existed.");
    }
  );
  conn.query(
    "CREATE TABLE inventory (id serial PRIMARY KEY, name VARCHAR(50), quantity INTEGER);",
    function (err, results, fields) {
      if (err) throw err;
      console.log("Created inventory table.");
    }
  );
  conn.query(
    "INSERT INTO inventory (name, quantity) VALUES (?, ?);",
    ["banana", 150],
    function (err, results, fields) {
      if (err) throw err;
      else console.log("Inserted " + results.affectedRows + " row(s).");
    }
  );
  conn.query(
    "INSERT INTO inventory (name, quantity) VALUES (?, ?);",
    ["orange", 154],
    function (err, results, fields) {
      if (err) throw err;
      console.log("Inserted " + results.affectedRows + " row(s).");
    }
  );

  conn.query(
    "INSERT INTO inventory (name, quantity) VALUES (?, ?);",
    ["apple", 100],
    function (err, results, fields) {
      if (err) throw err;
      console.log("Inserted " + results.affectedRows + " row(s).");
    }
  );
  conn.end(function (err) {
    if (err) throw err;
    else console.log("Done.");
  });
}
