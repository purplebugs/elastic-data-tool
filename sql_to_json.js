// EXTERNAL
import { writeFileSync } from "fs";

// INTERNAL
import { connectToDb } from "./functions/sql_queries/connect_to_db.js";
import { getAlpacaDetails } from "./functions/sql_queries/get_alpacas.js";
import fileTransformer from "./functions/fileTransformer.js";

const now = Date.now().toString();

/******** SQL -> JSON ********/
console.log(`[LOG] START SQL -> JSON`);

const connection = await connectToDb();

const [alpacaDetailsArray] = await getAlpacaDetails(connection);
console.log(`[LOG] Retrieving ${alpacaDetailsArray.length} alpaca details from database`);

await connection.end();

const enrichedAlpacaDetailsArray = await fileTransformer(
  alpacaDetailsArray,
  { bulkSyntax: false },
  { geoDecodeEnrich: true }
);
const alpacaJSON = `[${enrichedAlpacaDetailsArray.toString()}]`;

// TODO farmsJSON - get farms with count of alpacas from alpacaJSON

const farmsFromAlpacas = (alpacaJSON) => {
  const farms = new Map();

  // TODO sort out ridiculous alpacaJSON --> JSON.parse()
  for (const alpaca of JSON.parse(alpacaJSON)) {
    const lat = alpaca?.location?.coordinates[1] ?? null;
    const lng = alpaca?.location?.coordinates[0] ?? null;

    if (!farms.has(alpaca.keeperName)) {
      // First time for farm
      farms.set(alpaca.keeperName, { id: alpaca.companyId, lat: lat, lng: lng, countOfAlpacas: 0 });
    }

    if (farms.has(alpaca.keeperName)) {
      // Increment alpaca count for farm
      const count = farms.get(alpaca.keeperName).countOfAlpacas + 1;
      // console.log(`[LOG] Increment alpaca count for: ${alpaca.keeperName} to ${count}`);
      farms.set(alpaca.keeperName, {
        id: alpaca.companyId,
        lat: lat,
        lng: lng,
        countOfAlpacas: count,
      });
    }
  }

  // console.log("farms", farms);
  return farms;
};

// TODO write to file, extract to file, add test
farmsFromAlpacas(alpacaJSON);

console.log(`[LOG] END SQL -> JSON`);

/******** JSON -> FILE ********/
console.log(`[LOG] START JSON -> FILE`);

// Write to file which will write as one long line
writeFileSync(`./data/alpacas-from-sql-${now}.json`, alpacaJSON);
console.log("[LOG] See file: ", `./data/alpacas-from-sql-${now}.json`);

console.log(`[LOG] END JSON -> FILE`);

// For readability could JSON.parse and write to file with line breaks
