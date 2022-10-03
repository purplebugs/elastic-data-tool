import {
  connectToDb,
  getAlpacaRegistries,
  getAlpacaIdsFromNorwegianRegistry,
} from "./functions/sql-queries.js";

/******** SQL to JSON - in progress ********/

const connection = await connectToDb();
const [alpacaRegistries] = await getAlpacaRegistries(connection);
console.log("alpacaRegistries", alpacaRegistries);

const [results] = await getAlpacaIdsFromNorwegianRegistry(connection);
console.log("results", results);

// TODO convert SQL query result to JSON and store in file
