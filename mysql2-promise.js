import dotenv from "dotenv";
const config = dotenv.config();
import pkg from "mysql2/promise";

const connectToDb = async () => {
  const mysqlPromise = pkg; // get the client
  // create the connection
  const connection = await mysqlPromise.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.MYSQL_PASSWORD,
    database: "anita_database",
  });

  return connection;
};

const queryDb = async (connection) => {
  // query database
  const result = await connection.execute("SELECT * FROM `alp_Location`");

  return result;
};

const connection = await connectToDb();
//console.log(connection);

const [results, fields] = await queryDb(connection);
console.log("results", results);
//console.log("fields", fields);
