import { connectToDb } from "./functions/sql_queries/connect_to_db.js";

import {
  getAlpacaRegistries,
  getAlpacaIdsFromNorwegianRegistry,
  getAlpacaDetails,
} from "./functions/sql_queries/get_alpacas.js";

import fileTransformer from "./functions/fileTransformer.js";
import { farmsFromAlpacas } from "./functions/farmsFromAlpacas.js";
import bulkSyntax from "./functions/elasticsearch_commands/bulkSyntax.js";

// ELASTICSEARCH
import createIndexWithDocuments from "./functions/elasticsearch_commands/index.js";
import alpacaComponentTemplate from "./functions/elasticsearch_commands/component_templates/alpacas.js";
import farmsComponentTemplate from "./functions/elasticsearch_commands/component_templates/farms.js";
import companiesComponentTemplate from "./functions/elasticsearch_commands/component_templates/companies.js";

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

await connection.end();

const animals = await fileTransformer(alpacaDetailsArray, {
  geoDecodeEnrich: true,
  animal: "alpaca",
});
await createIndexWithDocuments(
  "animals_all",
  bulkSyntax(animals),
  alpacaComponentTemplate
);

const farms_all = bulkSyntax(
  farmsFromAlpacas(animals, { publicFarmsOnly: false })
);
await createIndexWithDocuments("farms_all", farms_all, farmsComponentTemplate);

const farms_public = bulkSyntax(
  farmsFromAlpacas(animals, { publicFarmsOnly: true })
);
await createIndexWithDocuments(
  "farms_public",
  farms_public,
  farmsComponentTemplate
);

const companies_all = bulkSyntax(
  farmsFromAlpacas(animals, { publicFarmsOnly: false, includeAlpacas: true })
);

// The order of templates matters.  Otherwise the nested property of alpacas is lost, GOD only knows why!!
await createIndexWithDocuments(
  "companies_all",
  companies_all,
  companiesComponentTemplate,
  farmsComponentTemplate
);

console.log(`[LOG] END SQL -> Elastic`);
