import { readFileSync, writeFileSync } from "fs";
import { getLatLongFromGeoNorge } from "./functions/geo-decode.js";
import { populationByMunicipalityLookup } from "./functions/geo-enrich/population-by-municipality.js";

/******** JSON to NDJSON and geodecode, enrich ********/

const now = Date.now().toString();
const myOutput = [];

// Edit this file name as needed
const jsonFileToConvertToNDJSON = "alpacas-address-camelCase.json";

// Read file from disk
const myFile = readFileSync(`./data/${jsonFileToConvertToNDJSON}`);

// Parse file
const myParsedFile = JSON.parse(myFile);

// Loop over all items

let count = 1;

for await (const item of myParsedFile) {
  // convert each item to a JSON string
  // {"name":"Happiest alpaca farm","street":"the street","alpacaShortName":"Fluffy","webpage":null,"alpacaId":123,"idOwners":2,"idCompany":3, zip: "0167", city: "Oslo", street: "Another Steet 132"}
  // {"name":"Cutest alpaca place","street":"another street","alpacaShortName":"Chanel","webpage":null,"alpacaId":345,"idOwners":4,"idCompany":6, zip: "0167", city: "Oslo", street: "Wergelandsveien 15"}

  // Label all farms as private for import into Elasticsearch
  // because public facing farm index will be created in Elasticsearch based on query and pipeline
  const publicFieldAdded = Object.assign({}, item, {
    farmType: { public: false },
  });

  const geoDecodeObj = await getLatLongFromGeoNorge(item);
  const geoDecodedObj = Object.assign(publicFieldAdded, geoDecodeObj);

  const geoEnrichObj = populationByMunicipalityLookup(geoDecodedObj);
  const geoEnrichedObj = Object.assign(geoDecodedObj, geoEnrichObj);

  // Uncomment for Elasticsearch POST /_bulk body format
  // myOutput.push(JSON.stringify({ index: { _id: count } }));

  // conveniently stringify also removes spaces
  myOutput.push(JSON.stringify(geoEnrichedObj));

  count++;
}

// joining all items in the array with new lines to form NDJSON
const myOutputFileContents = myOutput.join("\n");

writeFileSync(
  `./data/alpacas-format-cleaned-${now}.ndjson`,
  myOutputFileContents
);
