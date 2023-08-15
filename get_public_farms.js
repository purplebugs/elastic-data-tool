// SQL
import { connectToDb } from "./functions/sql_queries/connect_to_db.js";
import { getPublicFarms } from "./functions/sql_queries/get_public_farms.js";

// HELPERS
import { publicFarmBulkSyntax } from "./functions/publicFarmBulkSyntax.js";
import { writeFileSync } from "fs";

const now = Date.now().toString();

/******** SQL to JSON ********/

const connection = await connectToDb();

const [publicFarms] = await getPublicFarms(connection);

await connection.end();

console.log("[LOG] publicFarms", publicFarms);
console.log("[LOG] Number of publicFarms: ", publicFarms.length);

const resultJSON = JSON.stringify(publicFarms);

// Write to file which will write as one long line
writeFileSync(`./data/public-farms-from-sql-${now}.json`, resultJSON);
console.log("[LOG] See file: ", `./data/public-farms-from-sql-${now}.json`);

/******** to NDJSON file ********/

const myOutputFileContents = await publicFarmBulkSyntax(publicFarms);

writeFileSync(`./data/public-farms-for-elasticsearch-index-${now}.ndjson`, myOutputFileContents);
console.log("[LOG] See file: ", `./data/public-farms-for-elasticsearch-index-${now}.ndjson`);
