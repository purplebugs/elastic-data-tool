import { readFileSync, writeFileSync } from "fs";
import { getLatLongFromGeoNorge } from "./functions/geo-decode.js";

const myOutput = [];
const now = Date.now().toString();

// Read file from disk
const myFile = readFileSync(
  "./data/alpacas-address-camelCase-several-only.json"
);

// Parse file
const myParsedFile = JSON.parse(myFile);

// Loop over all items

let count = 1;

for await (const item of myParsedFile) {
  // convert each item to a JSON string, and conveniently stringify also removes spaces
  // eg
  // {"name":"Happiest alpaca farm","street":"the street","alpacaShortName":"Fluffy","webpage":null,"alpacaId":123,"idOwners":2,"idCompany":3, zip: "0167", city: "Oslo", street: "Another Steet 132"}
  // {"name":"Cutest alpaca place","street":"another street","alpacaShortName":"Chanel","webpage":null,"alpacaId":345,"idOwners":4,"idCompany":6, zip: "0167", city: "Oslo", street: "Wergelandsveien 15"}

  const geoObj = await getLatLongFromGeoNorge(item);
  const obj = Object.assign({}, item, geoObj);

  myOutput.push(JSON.stringify({ index: { _id: count } }));
  myOutput.push(JSON.stringify(obj));

  count++;
}

// joining all items in the array with new lines to form NDJSON
const myOutputFileContents = myOutput.join("\n");

writeFileSync(
  `./data/alpacas-api-format-cleaned-${now}.ndjson`,
  myOutputFileContents
);
