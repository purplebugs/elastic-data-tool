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

export const getAlpacaDetails = async (connection) => {
  const query =
    "select a.idAlpaca as AlpacaId, a.ShortName AS AlpacaShortName, " +
    "s.Name AS Gender, " +
    "color1.Name AS AlpacaColor1, " +
    "CONVERT(DOB, DATE) AS DOB, CONVERT(DOD, DATE) AS DOD, " +
    "a.Keeper, c.idCompany AS CompanyId, c.Name AS KeeperName, c.Street, c.Zip, c.City, c.Country, c.Webpage FROM `alp_Alpaca` a " +
    "INNER JOIN alp_Sex s ON a.Sex = s.idSex " +
    "INNER JOIN alp_Color color1 ON a.Color1 = color1.idColor " +
    "INNER JOIN alp_Company c on a.Keeper = c.idCompany WHERE a.idAlpaca IN " +
    "(SELECT r.Alpaca FROM alp_Register r INNER JOIN alp_Registry y ON r.Registry = y.idRegistry where r.Registry=1)";

  const result = await connection.execute(query);
  return result;
};
