import fileReader from "./functions/fileReader.js";
import fileTransformer from "./functions/fileTransformer.js";
import bulkSyntax from "./functions/elasticsearch_commands/bulkSyntax.js";

// ELASTICSEARCH
import createIndexWithDocuments from "./functions/elasticsearch_commands/index.js";
import alpacaComponentTemplate from "./functions/elasticsearch_commands/component_templates/alpacas.js";

// Edit this file name as needed
const jsonFile = "alpacas-address-camelCase-several-only.json"; // For full list: "alpacas-address-camelCase.json"  // or eg: "alpacas-from-sql-1674725939701.json"

const myParsedFile = fileReader(jsonFile);
const myOutput = bulkSyntax(
  await fileTransformer(myParsedFile, { geoDecodeEnrich: true })
);

await createIndexWithDocuments("alpacas", myOutput, alpacaComponentTemplate);
