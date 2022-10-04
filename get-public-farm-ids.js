import {
  connectToDb,
  getCompanyIdsOfPublicFarms,
} from "./functions/sql-queries/getCompanyIdOfPublicFarms.js";

import { writeFileSync } from "fs";

const now = Date.now().toString();

/******** SQL to JSON ********/

const connection = await connectToDb();

const [companyIdsOfPublicFarms] = await getCompanyIdsOfPublicFarms(connection);
console.log("companyIdsOfPublicFarms", companyIdsOfPublicFarms);

const resultJSON = JSON.stringify(companyIdsOfPublicFarms);
// Write to file which will write as one long line
writeFileSync(`./data/companyIds-from-sql-${now}.json`, resultJSON);
