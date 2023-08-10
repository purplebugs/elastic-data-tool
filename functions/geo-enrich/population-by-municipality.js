import { readFileSync, writeFileSync } from "fs";
import fetchRetry from "../fetchRetry.js";

// Locations of static dump of files from running getPopulationByMunicipalityFromSSB()
const backupPopulationByMunicipalityFileJSON = "./functions/geo-enrich/population-by-municipality-1663243071159.json";
const backupPopulationByMunicipalityFileNDJSON =
  "./functions/geo-enrich/population-by-municipality-1663230933633.ndjson";

export const getPopulationByMunicipalityFromSSB = async () => {
  const now = Date.now().toString();

  // kommuner = municipalities
  // Static dump of API query response from 2022-09-14 in population-by-municipality-download-07459_20220914-092711.json

  // Ref: https://www.ssb.no/statbank/table/07459/tableViewLayout1/
  // POST body in file: functions/geo-enrich/query-body.json

  // Read file from disk
  // TODO update so query is no longer hardcoded for year 2022
  const myQueryObjectBodyFile = readFileSync("functions/geo-enrich/population-by-municipality-query-body.json");

  // Parse file
  const myParsedQueryObjectBody = JSON.parse(myQueryObjectBodyFile);
  const myQueryBody = myParsedQueryObjectBody.queryObj;

  const response = await fetchRetry(
    "https://data.ssb.no/api/v0/no/table/07459/",
    {
      method: "post",
      body: JSON.stringify(myQueryBody),
      headers: { "Content-Type": "application/json" },
    },
    2
  );

  const data = await response.json();

  const municipalities = data.dimension.Region.category.index; // Eg: { 'K-3001': 0, 'K-3002': 1 }
  const labels = data.dimension.Region.category.label; // Eg: { 'K-3001': 'Halden', 'K-3002': 'Moss'}
  const values = data.value; // Eg: [31444, 50290]

  // Eg: {'municipalityNumber': 'K-3001', 'municipalityName':'Halden', 'population': 31444 },{'municipalityNumber': 'K-3002', 'municipalityName':'Moss', 'K-3002': 'Moss', 'population': 50290}
  const populationByMunicipalityArrayForJSON = [];
  const populationByMunicipalityArrayForNDJSON = [];

  for (const key in municipalities) {
    const index = municipalities[key];
    const zip = key.slice(2); // 'K-3001' -> '3001'
    console.log(`[LOG] Retrieving from API: ${key}: ${zip}: ${index}: ${labels[key]}: ${values[index]}`);

    populationByMunicipalityArrayForJSON.push({
      municipalityNumberFromSSB: key,
      municipalityNumber: zip,
      municipalityName: labels[key],
      population: values[index],
    });

    populationByMunicipalityArrayForNDJSON.push(
      JSON.stringify({
        municipalityNumberFromSSB: key,
        municipalityNumber: zip,
        municipalityName: labels[key],
        population: values[index],
      })
    );
  }

  // JSON file to use this array as dictionary lookup, eg. for enriching another data source with contents of this array
  // eg:
  // [{"municipalityNumberFromSSB":"K-3001","municipalityNumber":"3001","municipalityName":"Halden","population":31444},{"municipalityNumberFromSSB":"K-3002","municipalityNumber":"3002","municipalityName":"Moss","population":50290}]

  writeFileSync(`data/population-by-municipality-${now}.json`, JSON.stringify(populationByMunicipalityArrayForJSON));

  // joining all items in the array with new lines to form NDJSON, eg. to import to Elasticsearch as own index
  const myOutputFileContentsForNDJSON = populationByMunicipalityArrayForNDJSON.join("\n");

  writeFileSync(`data/population-by-municipality-${now}.ndjson`, myOutputFileContentsForNDJSON);
};

export const populationByMunicipalityLookup = (alpacaObject) => {
  // Read file from disk
  // TODO cache
  const myFile = readFileSync(backupPopulationByMunicipalityFileJSON);

  // Parse file, eg:
  const populationByMunicipalityArray = JSON.parse(myFile);

  // console.log(
  //   `[LOG] alpacaObject?.location?.kommunenummer:  ${alpacaObject?.location?.kommunenummer}`
  // );

  const found = populationByMunicipalityArray.find(
    (item) => item?.municipalityNumber == alpacaObject?.location?.kommunenummer
  );

  if (found) {
    return {
      found,
    };
  } else {
    return { populationByMunicipality: "not found" };
  }
};
