import { writeFileSync } from "fs";
import fileReader from "./functions/fileReader.js";
import fileTransformer from "./functions/fileTransformer.js";

/******** JSON -> geodecode + enrich -> array ********/

const now = Date.now().toString();

// Edit this file name as needed
const jsonFileToConvertToNDJSON = "alpacas-address-camelCase-several-only.json";

const myParsedFile = fileReader(jsonFileToConvertToNDJSON);
const myOutput = await fileTransformer(myParsedFile, { bulkSyntax: false }, { geoDecodeEnrich: true });

/******** array -> NDJSON ********/

// joining all items in the array with new lines to form NDJSON
const myOutputFileContents = myOutput
  .map((item) => {
    // Stringify also conveniently also removes spaces
    return JSON.stringify(item);
  })
  .join("\n");

/******** NDJSON -> FILE ********/

writeFileSync(`./data/alpacas-format-cleaned-${now}.ndjson`, myOutputFileContents);
console.log("[LOG] See file: ", `./data/alpacas-format-cleaned-${now}.ndjson`);
