import dotenv from "dotenv";
const config = dotenv.config();
import pkg from "mysql2/promise";

export const connectToDb = async (cloud = false) => {
  let connection = null;

  if (!cloud) {
    const mysqlPromise = pkg; // get the client
    // create the connection
    connection = await mysqlPromise.createConnection({
      host: "localhost",
      user: "root",
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    });
  }

  return connection;
};
