import { readFileSync, writeFileSync } from "fs";
import fetch from "node-fetch";

export const getPopulationByMunicipalityFromGeoNorge = async () => {
  const now = Date.now().toString();

  // kommuner = municipalities
  // Static dump of query response from 2022-09-14 in download-07459_20220914-092711.json

  // Ref: https://www.ssb.no/statbank/table/07459/tableViewLayout1/
  // POST body in file: functions/alpaca-to-humans-ratio-pr-municipality/query-body.json

  // TODO correlate Region eg K-3004 with "kommunenummer": "3004" from geonorge
  // In this example "kommunenummer": "3004" is "kommunenavn": "FREDRIKSTAD"
  // See file: geo-decode.js that uses https://ws.geonorge.no/adresser/v1/#/default/get_sok

  // Read file from disk
  const myQueryObjectBodyFile = readFileSync(
    "functions/alpaca-to-humans-ratio-pr-municipality/query-body-population-by-municipality.json"
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
    console.log(`${key}: ${index} : ${labels[key]} : ${values[index]}`);

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
    `functions/alpaca-to-humans-ratio-pr-municipality/population-by-municipality-${now}.ndjson`,
    myOutputFileContents
  );
};

getPopulationByMunicipalityFromGeoNorge();
