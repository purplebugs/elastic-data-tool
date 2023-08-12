import fileReader from "./functions/fileReader.js";
import fileTransformer from "./functions/fileTransformer.js";
import createIndexWithDocuments from "./functions/elasticsearch_commands/index.js";

// Edit this file name as needed
const jsonFile = "alpacas-address-camelCase-several-only.json"; // For full list: "alpacas-address-camelCase.json"  // or eg: "alpacas-from-sql-1674725939701.json"

const myParsedFile = fileReader(jsonFile);
const myOutput = await fileTransformer(myParsedFile, { bulkSyntax: true });

await createIndexWithDocuments(myOutput);
