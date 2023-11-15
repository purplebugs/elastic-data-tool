// SQL
import { connectToDb } from "./sql_queries/connect_to_db.js";
import { getPublicFarms } from "./sql_queries/get_public_farms.js";

// HELPERS
import { getLatLngFromAddress } from "./geo-decode.js";

export default async function fileTransformer(file, { geoDecodeEnrich = true }) {
  // Loop over all items

  const myOutput = [];
  let count = 1;

  const connection = await connectToDb();
  const [publicFarms] = await getPublicFarms(connection);
  await connection.end();

  for await (const item of file) {
    // convert each item to a JSON string
    // {"name":"Happiest alpaca farm","street":"the street","alpacaShortName":"Fluffy","webpage":null,"alpacaId":123,"idOwners":2,"idCompany":3, zip: "0167", city: "Oslo", street: "Another Steet 132"}
    // {"name":"Cutest alpaca place","street":"another street","alpacaShortName":"Chanel","webpage":null,"alpacaId":345,"idOwners":4,"idCompany":6, zip: "0167", city: "Oslo", street: "Wergelandsveien 15"}

    // Label farm as public if in approved list.  No longer needs to be done in Elasticsearch using enrich policy
    // By default all farms are private
    let itemTransformed = Object.assign({}, item, { public: false, private: true });

    if (
      item.keeperName &&
      publicFarms.map((farm) => farm.name).some((element) => element.toLowerCase() === item.keeperName.toLowerCase())
    ) {
      // If farm is found in approved public list, it is no longer private
      itemTransformed = Object.assign({}, item, { public: true, private: false });
      console.log("[LOG] Farm is public: ", item.keeperName);
    }

    if (geoDecodeEnrich) {
      const geoDecodeObj = await getLatLngFromAddress(item);
      itemTransformed = Object.assign(itemTransformed, geoDecodeObj);
    }

    myOutput.push(itemTransformed);

    count++;
  }
  return myOutput;
}
