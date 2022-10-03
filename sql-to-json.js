import {
  connectToDb,
  getAlpacaRegistries,
  getAlpacaIdsFromNorwegianRegistry,
  getAlpacaDetails,
} from "./functions/sql-queries.js";

/******** SQL to JSON - in progress ********/

const connection = await connectToDb();
const [alpacaRegistries] = await getAlpacaRegistries(connection);
console.log("alpacaRegistries", alpacaRegistries);

const [alpacaIdsFromNorwegianRegistry] =
  await getAlpacaIdsFromNorwegianRegistry(connection);
console.log("alpacaIdsFromNorwegianRegistry", alpacaIdsFromNorwegianRegistry);

const [alpacaDetails] = await getAlpacaDetails(connection);
console.log("alpacaDetails", alpacaDetails);

// TODO convert SQL query result to JSON and store in file
