import { connectToDb } from "./functions/sql_queries/connect_to_db.js";

import { getPublicFarms } from "./functions/sql_queries/get_public_farms.js";

import { writeFileSync } from "fs";

const now = Date.now().toString();

export const transformerBulkSyntax = async (farms) => {
  // For creation of public farms index in Elasticsearch to be used as enrich pipeline

  const myOutput = [];
  let count = 1;

  for await (const item of farms) {
    // For Elasticsearch POST /_bulk body format
    myOutput.push(JSON.stringify({ index: { _id: count } }));

    // Label all farms as public
    const publicFieldAdded = Object.assign({}, item, { public: true });

    // conveniently stringify also removes spaces
    myOutput.push(JSON.stringify(publicFieldAdded));
    count++;
  }

  // joining all items in the array with new lines to form NDJSON
  const result = myOutput.join("\n");

  /* Example file output

{"index":{"_id":1}}
{"keeper":32,"name":"Farm name 1","public":true}
{"index":{"_id":2}}
{"keeper":16,"name":"Farm name 2","public":true}

*/

  return result;
};

/******** SQL to JSON ********/

const connection = await connectToDb();

const [publicFarms] = await getPublicFarms(connection);
console.log("[LOG] Number of publicFarms: ", publicFarms.length);

const resultJSON = JSON.stringify(publicFarms);

// Write to file which will write as one long line
writeFileSync(`./data/public-farms-from-sql-${now}.json`, resultJSON);
console.log("[LOG] See file: ", `./data/public-farms-from-sql-${now}.json`);

/******** to NDJSON file ********/

const myOutputFileContents = await transformerBulkSyntax(publicFarms);

writeFileSync(`./data/public-farms-for-elasticsearch-index-${now}.ndjson`, myOutputFileContents);
console.log("[LOG] See file: ", `./data/public-farms-for-elasticsearch-index-${now}.ndjson`);
