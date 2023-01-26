import fileReader from "./functions/fileReader.js";
import fileTransformer from "./functions/fileTransformer.js";
import createIndexWithDocuments from "./functions/elasticsearch-commands/index.js";

// Edit this file name as needed
const jsonFileToConvertToNDJSON = "alpacas-address-camelCase-several-only.json"; // For full list: "alpacas-address-camelCase.json"  // or eg: "alpacas-from-sql-1674725939701.json"

const myParsedFile = fileReader(jsonFileToConvertToNDJSON);
const myOutput = await fileTransformer(myParsedFile, true);

await createIndexWithDocuments(myOutput);
