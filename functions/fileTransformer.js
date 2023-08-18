import { getLatLongFromGeoNorge } from "./geo-decode.js";
import { populationByMunicipalityLookup } from "./geo-enrich/population-by-municipality.js";
import { PUBLIC_FARMS } from "./sql_queries/public_farms.js";

export default async function fileTransformer(file, { geoDecodeEnrich = true }) {
  // Loop over all items

  const myOutput = [];
  let count = 1;

  for await (const item of file) {
    // convert each item to a JSON string
    // {"name":"Happiest alpaca farm","street":"the street","alpacaShortName":"Fluffy","webpage":null,"alpacaId":123,"idOwners":2,"idCompany":3, zip: "0167", city: "Oslo", street: "Another Steet 132"}
    // {"name":"Cutest alpaca place","street":"another street","alpacaShortName":"Chanel","webpage":null,"alpacaId":345,"idOwners":4,"idCompany":6, zip: "0167", city: "Oslo", street: "Wergelandsveien 15"}

    // Label farm as public if in approved list.  No longer needs to be done in Elasticsearch using enrich policy
    let itemTransformed = Object.assign({}, item, { public: false });

    if (item.keeperName && PUBLIC_FARMS.some((element) => element.toLowerCase() === item.keeperName.toLowerCase())) {
      itemTransformed = Object.assign({}, item, { public: true });
      console.log("[LOG] Farm is public: ", item.keeperName);
    }

    if (geoDecodeEnrich) {
      const geoDecodeObj = await getLatLongFromGeoNorge(item);
      itemTransformed = Object.assign(itemTransformed, geoDecodeObj);

      const geoEnrichObj = populationByMunicipalityLookup(itemTransformed);
      itemTransformed = Object.assign(itemTransformed, geoEnrichObj);
    }

    myOutput.push(itemTransformed);

    count++;
  }
  return myOutput;
}
