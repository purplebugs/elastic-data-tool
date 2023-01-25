// import dotenv from "dotenv";
// const config = dotenv.config();
import { config } from "../../config.js";
import pkg from "mysql2/promise";
// import { readFileSync } from "fs";

const configLocal = {
  host: config.get("db.host"),
  database: config.get("db.name"),
  user: config.get("db.user"),
  password: config.get("db.password"),
};

/* TODO use config to handle host the app runs from 

const configAzure = {
  host: process.env.MYSQL_AZURE_HOST,
  user: process.env.MYSQL_AZURE_USER,
  password: process.env.MYSQL_AZURE_PASSWORD,
  database: process.env.MYSQL_AZURE_DATABASE,
  port: 3306,
  ssl: {
    ca: readFileSync(`./data/${process.env.MYSQL_AZURE_CERTIFICATE}`),
  },
};
*/

export const connectToDb = async () => {
  let connection = null;
  const mysqlPromise = pkg; // get the client

  // create the connection
  connection = await mysqlPromise.createConnection(configLocal);

  return connection;
};
