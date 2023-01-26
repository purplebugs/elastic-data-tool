import { writeFileSync } from "fs";
import fileReader from "./functions/fileReader.js";
import fileTransformer from "./functions/fileTransformer.js";

/******** JSON to NDJSON and geodecode, enrich ********/

const now = Date.now().toString();

// Edit this file name as needed
const jsonFileToConvertToNDJSON = "alpacas-address-camelCase-several-only.json";

const myParsedFile = fileReader(jsonFileToConvertToNDJSON);
const myOutput = await fileTransformer(myParsedFile);

// joining all items in the array with new lines to form NDJSON
const myOutputFileContents = myOutput.join("\n");

writeFileSync(
  `./data/alpacas-format-cleaned-${now}.ndjson`,
  myOutputFileContents
);
