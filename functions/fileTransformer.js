import { getLatLngFromAddress } from "./geo-decode.js";
import { PUBLIC_FARMS } from "./sql_queries/public_farms.js";

export default async function fileTransformer(file, geoDecodeEnrich = true, animal = "alpaca") {
  // Loop over all items

  const myOutput = [];
  let count = 1;

  for await (const item of file) {
    // convert each item to a JSON string
    // {"name":"Happiest alpaca farm","street":"the street","alpacaShortName":"Fluffy","webpage":null,"alpacaId":123,"idOwners":2,"idCompany":3, zip: "0167", city: "Oslo", street: "Another Steet 132"}
    // {"name":"Cutest alpaca place","street":"another street","alpacaShortName":"Chanel","webpage":null,"alpacaId":345,"idOwners":4,"idCompany":6, zip: "0167", city: "Oslo", street: "Wergelandsveien 15"}

    // Label farm as public if in approved list.  No longer needs to be done in Elasticsearch using enrich policy
    // By default all farms are private
    let itemTransformed = Object.assign({}, item, { public: false, private: true });

    if (item.keeperName && PUBLIC_FARMS.some((element) => element.toLowerCase() === item.keeperName.toLowerCase())) {
      // If farm is found in approved public list, it is no longer private
      itemTransformed = Object.assign({}, item, { public: true, private: false });
      console.log("[LOG] Farm is public: ", item.keeperName);
    }

    if (geoDecodeEnrich) {
      const geoDecodeObj = await getLatLngFromAddress(item);
      itemTransformed = Object.assign(itemTransformed, geoDecodeObj);
    }

    if (animal === "alpaca") {
      itemTransformed = Object.assign(itemTransformed, { type: "alpaca" });
    }

    myOutput.push(itemTransformed);

    count++;
  }
  return myOutput;
}
