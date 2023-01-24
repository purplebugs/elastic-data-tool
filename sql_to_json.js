import { connectToDb } from "./functions/sql_queries/connect_to_db.js";

import {
  getAlpacaRegistries,
  getAlpacaIdsFromNorwegianRegistry,
  getAlpacaDetails,
} from "./functions/sql_queries/get_alpacas.js";

import { writeFileSync } from "fs";

const now = Date.now().toString();

/******** SQL to JSON ********/

const connection = await connectToDb();
// TODO use cloud = true somewhere in app based on command line flag for MySQL Azure db, eg
// const connection = await connectToDb(true);
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
