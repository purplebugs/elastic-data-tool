import { readFileSync, writeFileSync } from "fs";
import { printAddressToConsole } from "./geo-decode.js";

const myOutput = [];
const now = Date.now().toString();

// Read file from disk
const myFile = readFileSync("./data/alpacas-two-only.json");

// Parse file
const myParsedFile = JSON.parse(myFile);

// Loop over all items

myParsedFile.forEach((item, count) => {
  // convert each item to a JSON string, and conveniently stringify also removes spaces
  // eg
  // {"Name":"Happiest alpaca farm","Street":"the street","alpaca":"Fluffy","Webpage":null,"alpacaId":123,"idOwners":2,"idCompany":3, Zip: "0167", City: "Oslo", Street: "Another Steet 132"}
  // {"Name":"Cutest alpaca place","Street":"another street","alpaca":"Chanel","Webpage":null,"alpacaId":345,"idOwners":4,"idCompany":6, Zip: "0167", City: "Oslo", Street: "Wergelandsveien 15"}

  printAddressToConsole(item); // Work in progress: add latitude, longitude based on item's address fields, TODO bugfix undefined from loop with async/await

  myOutput.push(JSON.stringify({ index: { _id: count + 1 } }));
  myOutput.push(JSON.stringify(item));
});

// joining all items in the array with new lines to form NDJSON
const myOutputFileContents = myOutput.join("\n");

writeFileSync(
  `./data/alpacas-api-format-cleaned-${now}.ndjson`,
  myOutputFileContents
);

// Print file
//console.log(myParsedFile);
