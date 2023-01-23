import {
  connectToDb,
  getAlpacaRegistries,
  getAlpacaIdsFromNorwegianRegistry,
  getAlpacaDetails,
} from "./functions/sql-queries/getAlpacas.js";

import { writeFileSync } from "fs";

const now = Date.now().toString();

/******** SQL to JSON ********/

const connection = await connectToDb();
const [alpacaRegistries] = await getAlpacaRegistries(connection);
console.log("alpacaRegistries", alpacaRegistries);

const [alpacaIdsFromNorwegianRegistry] =
  await getAlpacaIdsFromNorwegianRegistry(connection);
console.log("alpacaIdsFromNorwegianRegistry", alpacaIdsFromNorwegianRegistry);

const [alpacaDetailsArray] = await getAlpacaDetails(connection);
console.log("alpacaDetailsArray", alpacaDetailsArray);

const alpacaJSON = JSON.stringify(alpacaDetailsArray);
// Write to file which will write as one long line
writeFileSync(`./data/alpacas-from-sql-${now}.json`, alpacaJSON);

// For readability could JSON.parse and write to file with line breaks
