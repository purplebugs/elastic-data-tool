import dotenv from "dotenv";
const config = dotenv.config();
import pkg from "mysql2/promise";

export const connectToDb = async () => {
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

export const getAlpacaRegistries = async (connection) => {
  // query database
  const result = await connection.execute("SELECT * FROM `alp_Registry`");

  return result;
};

export const getAlpacaIdsFromNorwegianRegistry = async (connection) => {
  // query database
  const result = await connection.execute(
    "SELECT r.Alpaca FROM `alp_Register` r INNER JOIN `alp_Registry` y ON r.Registry = y.idRegistry where r.Registry=1"
  );

  return result;
};
