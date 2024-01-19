import { PUBLIC_FARMS } from "./sql_queries/public_farms.js";

import { colorTransformer } from "./colorTransformer.js";
import { dateTransformer } from "./dateTransformer.js";
import { getLatLng_GoogleAddress_FromAddress } from "./geoDecode.js";
import { urlTransformer } from "./urlTransformer.js";

export default async function fileTransformer(file, { geoDecodeEnrich = true, animal = "alpaca" } = {}) {
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

    const colorTransformed = colorTransformer({
      color1: item?.color1,
      color2: item?.color2,
      color3: item?.color3,
      colorSolid: item?.colorSolid,
    });

    if (colorTransformed !== null) {
      delete itemTransformed.color1;
      delete itemTransformed.color2;
      delete itemTransformed.color3;
      delete itemTransformed.colorSolid;
      itemTransformed = Object.assign(itemTransformed, colorTransformed);
    }

    const dateTransformed = dateTransformer(item?.DOB, "DOB");
    console.log("---- dateTransformed", dateTransformed);
    if (dateTransformed !== null) {
      itemTransformed = Object.assign(itemTransformed, dateTransformed);
    }

    const urlTransformed = urlTransformer(item?.webpage);
    if (urlTransformed !== null) {
      itemTransformed = Object.assign(itemTransformed, urlTransformed);
    }

    if (geoDecodeEnrich) {
      const geoDecodeObj = await getLatLng_GoogleAddress_FromAddress(item);
      itemTransformed = Object.assign(itemTransformed, geoDecodeObj);
    }

    if (animal !== null || animal !== undefined) {
      itemTransformed = Object.assign(itemTransformed, { type: animal });
    }

    myOutput.push(itemTransformed);

    count++;
  }
  return myOutput;
}
