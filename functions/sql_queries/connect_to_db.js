import dotenv from "dotenv";
const config = dotenv.config();
import pkg from "mysql2/promise";
import { readFileSync } from "fs";

const configLocal = {
  host: "localhost",
  user: "root",
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
};

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

export const connectToDb = async (cloud = false) => {
  let connection = null;
  const mysqlPromise = pkg; // get the client

  if (!cloud) {
    // create the connection
    connection = await mysqlPromise.createConnection(configLocal);
  }
  if (cloud) {
    // create the connection
    connection = await mysqlPromise.createConnection(configAzure);
  }

  return connection;
};
