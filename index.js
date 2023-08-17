import { connectToDb } from "./functions/sql_queries/connect_to_db.js";

import {
  getAlpacaRegistries,
  getAlpacaIdsFromNorwegianRegistry,
  getAlpacaDetails,
} from "./functions/sql_queries/get_alpacas.js";

import fileTransformer from "./functions/fileTransformer.js";

// ELASTICSEARCH
import createIndexWithDocuments from "./functions/elasticsearch_commands/index.js";
import alpacaComponentTemplate from "./functions/elasticsearch_commands/component_templates/alpacas.js";

/******** SQL -> Elastic ********/
console.log(`[LOG] START SQL -> Elastic`);

const connection = await connectToDb();

const [alpacaRegistries] = await getAlpacaRegistries(connection);
console.log(`[LOG] Retrieving ${alpacaRegistries.length} alpaca registry ids from database`);

const [alpacaIdsFromNorwegianRegistry] = await getAlpacaIdsFromNorwegianRegistry(connection);
console.log(`[LOG] Retrieving ${alpacaIdsFromNorwegianRegistry.length} alpaca ids from database`);

const [alpacaDetailsArray] = await getAlpacaDetails(connection);
console.log(`[LOG] Retrieving ${alpacaDetailsArray.length} alpaca details from database`);

await connection.end();

const myOutput = await fileTransformer(alpacaDetailsArray, { bulkSyntax: true }, { geoDecodeEnrich: true });

await createIndexWithDocuments("alpacas", myOutput, alpacaComponentTemplate);

console.log(`[LOG] END SQL -> Elastic`);
