import { getLatLongFromGeoNorge } from "./geo-decode.js";
import { populationByMunicipalityLookup } from "./geo-enrich/population-by-municipality.js";

export default async function fileTransformer(file, bulkSyntax) {
  // Loop over all items

  const myOutput = [];
  let count = 1;

  for await (const item of file) {
    // convert each item to a JSON string
    // {"name":"Happiest alpaca farm","street":"the street","alpacaShortName":"Fluffy","webpage":null,"alpacaId":123,"idOwners":2,"idCompany":3, zip: "0167", city: "Oslo", street: "Another Steet 132"}
    // {"name":"Cutest alpaca place","street":"another street","alpacaShortName":"Chanel","webpage":null,"alpacaId":345,"idOwners":4,"idCompany":6, zip: "0167", city: "Oslo", street: "Wergelandsveien 15"}

    // Label all farms as private for import into Elasticsearch
    // because public facing farm index will be created in Elasticsearch based on query and pipeline
    const publicFieldAdded = Object.assign({}, item, { public: false });

    const geoDecodeObj = await getLatLongFromGeoNorge(item);
    const geoDecodedObj = Object.assign(publicFieldAdded, geoDecodeObj);

    const geoEnrichObj = populationByMunicipalityLookup(geoDecodedObj);
    const geoEnrichedObj = Object.assign(geoDecodedObj, geoEnrichObj);

    if (bulkSyntax) {
      // For Elasticsearch POST /_bulk body format
      //[{ create: {} }, alpacaDocument_1, { create: {} }, alpacaDocument_2],

      myOutput.push({ create: {} });
      myOutput.push(geoEnrichedObj);
    } else {
      // conveniently stringify also removes spaces
      myOutput.push(JSON.stringify(geoEnrichedObj));
    }
    //console.log(myOutput);

    count++;
  }
  return myOutput;
}
