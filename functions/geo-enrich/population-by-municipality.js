import { readFileSync, writeFileSync } from "fs";
import fetch from "node-fetch";

export const getPopulationByMunicipalityFromSSB = async () => {
  const now = Date.now().toString();

  // kommuner = municipalities
  // Static dump of query response from 2022-09-14 in population-by-municipality-download-07459_20220914-092711.json
  // Static dump of NDJSON from running this file in population-by-municipality-1663181354141.ndjson

  // Ref: https://www.ssb.no/statbank/table/07459/tableViewLayout1/
  // POST body in file: functions/geo-enrich/query-body.json

  // TODO correlate Region eg K-3004 with "kommunenummer": "3004" from geonorge
  // In this example "kommunenummer": "3004" is "kommunenavn": "FREDRIKSTAD"
  // See file: geo-decode.js that uses https://ws.geonorge.no/adresser/v1/#/default/get_sok

  // Read file from disk
  // TODO update so query is no longer hardcoded for year 2022
  const myQueryObjectBodyFile = readFileSync(
    "functions/geo-enrich/population-by-municipality-query-body.json"
  );

  // Parse file
  const myParsedQueryObjectBody = JSON.parse(myQueryObjectBodyFile);
  const myQueryBody = myParsedQueryObjectBody.queryObj;

  const response = await fetch("https://data.ssb.no/api/v0/no/table/07459/", {
    method: "post",
    body: JSON.stringify(myQueryBody),
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();

  const municipalities = data.dimension.Region.category.index; // Eg: { 'K-3001': 0, 'K-3002': 1 }
  const labels = data.dimension.Region.category.label; // Eg: { 'K-3001': 'Halden', 'K-3002': 'Moss'}
  const values = data.value; // Eg: [31444, 50290]

  // Eg: {'municipalityNumber': 'K-3001', 'municipalityName':'Halden', 'population': 31444 },{'municipalityNumber': 'K-3002', 'municipalityName':'Moss', 'K-3002': 'Moss', 'population': 50290}
  const populationByMunicipalityArray = [];

  for (const key in municipalities) {
    const index = municipalities[key];
    console.log(
      `[LOG] Retrieving from API: ${key}: ${index} : ${labels[key]} : ${values[index]}`
    );

    populationByMunicipalityArray.push(
      JSON.stringify({
        municipalityNumber: key,
        municipalityName: labels[key],
        population: values[index],
      })
    );
  }

  // joining all items in the array with new lines to form NDJSON
  const myOutputFileContents = populationByMunicipalityArray.join("\n");

  writeFileSync(
    `data/population-by-municipality-${now}.ndjson`,
    myOutputFileContents
  );
};

getPopulationByMunicipalityFromSSB();
