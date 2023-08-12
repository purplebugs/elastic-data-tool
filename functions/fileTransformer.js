import { getLatLongFromGeoNorge } from "./geo-decode.js";
import { populationByMunicipalityLookup } from "./geo-enrich/population-by-municipality.js";
import { PUBLIC_FARMS } from "./sql_queries/public_farms.js";

export default async function fileTransformer(file, { bulkSyntax = false }, { geoDecodeEnrich = true }) {
  // Loop over all items

  const myOutput = [];
  let count = 1;

  for await (const item of file) {
    // convert each item to a JSON string
    // {"name":"Happiest alpaca farm","street":"the street","alpacaShortName":"Fluffy","webpage":null,"alpacaId":123,"idOwners":2,"idCompany":3, zip: "0167", city: "Oslo", street: "Another Steet 132"}
    // {"name":"Cutest alpaca place","street":"another street","alpacaShortName":"Chanel","webpage":null,"alpacaId":345,"idOwners":4,"idCompany":6, zip: "0167", city: "Oslo", street: "Wergelandsveien 15"}

    // Label farm as public if in approved list.  No longer needs to be done in Elasticsearch using enrich policy
    let publicFieldAdded = Object.assign({}, item, { public: false });
    if (item.keeperName && PUBLIC_FARMS.some((element) => element.toLowerCase() === item.keeperName.toLowerCase())) {
      publicFieldAdded = Object.assign({}, item, { public: true });
      console.log("[LOG] Farm is public: ", item.keeperName);
    }

    let geoEnrichedObj = {};
    if (geoDecodeEnrich) {
      const geoDecodeObj = await getLatLongFromGeoNorge(item);
      const geoDecodedObj = Object.assign(publicFieldAdded, geoDecodeObj);

      const geoEnrichObj = populationByMunicipalityLookup(geoDecodedObj);
      geoEnrichedObj = Object.assign(geoDecodedObj, geoEnrichObj);
    }

    if (bulkSyntax && geoDecodeEnrich) {
      // For Elasticsearch POST /_bulk body format
      //[{ create: {} }, alpacaDocument_1, { create: {} }, alpacaDocument_2],

      myOutput.push({ create: {} });
      myOutput.push(geoEnrichedObj);
    }

    if (!bulkSyntax && geoDecodeEnrich) {
      // conveniently stringify also removes spaces
      myOutput.push(JSON.stringify(geoEnrichedObj));
    }
    //console.log(myOutput);

    count++;
  }
  return myOutput;
}
