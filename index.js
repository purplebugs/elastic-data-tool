import { connectToDb } from "./functions/sql_queries/connect_to_db.js";

import {
  getAlpacaRegistries,
  getAlpacaIdsFromNorwegianRegistry,
  getAlpacaDetails,
} from "./functions/sql_queries/get_alpacas.js";

import fileTransformer from "./functions/fileTransformer.js";
import createIndexWithDocuments from "./functions/elasticsearch_commands/index.js";

/******** SQL -> Elastic ********/
console.log(`[LOG] START SQL -> Elastic`);

const connection = await connectToDb();

const [alpacaRegistries] = await getAlpacaRegistries(connection);
console.log(
  `[LOG] Retrieving ${alpacaRegistries.length} alpaca registry ids from database`
);

const [alpacaIdsFromNorwegianRegistry] =
  await getAlpacaIdsFromNorwegianRegistry(connection);
console.log(
  `[LOG] Retrieving ${alpacaIdsFromNorwegianRegistry.length} alpaca ids from database`
);

const [alpacaDetailsArray] = await getAlpacaDetails(connection);
console.log(
  `[LOG] Retrieving ${alpacaDetailsArray.length} alpaca details from database`
);

const myOutput = await fileTransformer(alpacaDetailsArray, true);

await createIndexWithDocuments(myOutput);

console.log(`[LOG] END SQL -> Elastic`);
