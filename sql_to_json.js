import { connectToDb } from "./functions/sql_queries/connect_to_db.js";

import {
  getAlpacaRegistries,
  getAlpacaIdsFromNorwegianRegistry,
  getAlpacaDetails,
} from "./functions/sql_queries/get_alpacas.js";

import { writeFileSync } from "fs";

const now = Date.now().toString();

/******** SQL -> JSON ********/

const connection = await connectToDb();

const [alpacaDetailsArray] = await getAlpacaDetails(connection);
// console.log("alpacaDetailsArray", alpacaDetailsArray);

const alpacaJSON = JSON.stringify(alpacaDetailsArray);

/******** JSON -> FILE ********/

// Write to file which will write as one long line
writeFileSync(`./data/alpacas-from-sql-${now}.json`, alpacaJSON);

// For readability could JSON.parse and write to file with line breaks
