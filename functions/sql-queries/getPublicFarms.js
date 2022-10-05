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
export const getPublicFarms = async (connection) => {
  // query database
  const result = await connection.execute(
    "SELECT idCompany AS keeper, Name AS name FROM `alp_Company` WHERE `Name` IN ('Farm name 1', 'Farm name 2') ORDER BY Name"
  );

  return result;
};
