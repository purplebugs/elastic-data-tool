// EXTERNAL
import { writeFileSync } from "fs";

// INTERNAL
import { connectToDb } from "./functions/sql_queries/connect_to_db.js";
import { getAlpacaDetails } from "./functions/sql_queries/get_alpacas.js";
import fileTransformer from "./functions/fileTransformer.js";
import { farmsFromAlpacas } from "./functions/farmsFromAlpacas.js";

const now = Date.now().toString();

/******** SQL -> JSON ********/
console.log(`[LOG] START SQL -> JSON`);

const connection = await connectToDb();

const [alpacaDetailsArray] = await getAlpacaDetails(connection);
console.log(`[LOG] Retrieving ${alpacaDetailsArray.length} alpaca details from database`);

await connection.end();

const enrichedAlpacaDetailsArray = await fileTransformer(alpacaDetailsArray, { geoDecodeEnrich: true });

const farms_ALL_WithAlpacaCountArray = farmsFromAlpacas(enrichedAlpacaDetailsArray, { publicFarmsOnly: false });
const farms_PUBLIC_WithAlpacaCountArray = farmsFromAlpacas(enrichedAlpacaDetailsArray, { publicFarmsOnly: true });

console.log(`[LOG] END SQL -> JSON`);

/******** JSON -> FILE ********/
console.log(`[LOG] START JSON -> FILE`);

// Write to file which will write as one long line
writeFileSync(`./data/alpacas-from-sql-${now}.json`, JSON.stringify(enrichedAlpacaDetailsArray));
console.log("[LOG] See file: ", `./data/alpacas-from-sql-${now}.json`);

writeFileSync(`./data/farms-ALL-from-alpacas-from-sql-${now}.json`, JSON.stringify(farms_ALL_WithAlpacaCountArray));
console.log("[LOG] See file: ", `./data/farms-ALL-from-alpacas-from-sql-${now}.json`);

writeFileSync(
  `./data/farms-PUBLIC-from-alpacas-from-sql-${now}.json`,
  JSON.stringify(farms_PUBLIC_WithAlpacaCountArray)
);
console.log("[LOG] See file: ", `./data/farms-PUBLIC-from-alpacas-from-sql-${now}.json`);

console.log(`[LOG] END JSON -> FILE`);

// For readability could JSON.parse and write to file with line breaks
