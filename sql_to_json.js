// EXTERNAL
import { writeFileSync } from "fs";

// INTERNAL
import { connectToDb } from "./functions/sql_queries/connect_to_db.js";
import { getAlpacaDetails } from "./functions/sql_queries/get_alpacas.js";
import fileTransformer from "./functions/fileTransformer.js";

const now = Date.now().toString();

/******** SQL -> JSON ********/
console.log(`[LOG] START SQL -> JSON`);

const connection = await connectToDb();

const [alpacaDetailsArray] = await getAlpacaDetails(connection);
console.log(`[LOG] Retrieving ${alpacaDetailsArray.length} alpaca details from database`);

const enrichedAlpacaDetailsArray = await fileTransformer(alpacaDetailsArray, false);
const alpacaJSON = `[${enrichedAlpacaDetailsArray.toString()}]`;

console.log(`[LOG] END SQL -> JSON`);

/******** JSON -> FILE ********/
console.log(`[LOG] START JSON -> FILE`);

// Write to file which will write as one long line
writeFileSync(`./data/alpacas-from-sql-${now}.json`, alpacaJSON);

console.log(`[LOG] END JSON -> FILE`);

// For readability could JSON.parse and write to file with line breaks
