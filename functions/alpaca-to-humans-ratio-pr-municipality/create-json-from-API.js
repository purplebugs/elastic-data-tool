import { readFileSync } from "fs";
import fetch from "node-fetch";

export const getPopulationByMunicipalityFromGeoNorge = async () => {
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
  let count = 1;

  console.log(
    "[LOG municipalities]: data.dimension.Region.category.label",
    data.dimension.Region.category.label
  );

  // Object to array, eg: {'K-3001': 'Halden', 'K-3002': 'Moss'} -> [ K-3001: Halden, K-3002: Moss ]
  const arrayOfMunicipalities = Object.entries(
    data.dimension.Region.category.label
  );

  console.log("[LOG array of municipalities]:", arrayOfMunicipalities);

  // const labelObj = data.dimension.Region.category.label;
  // for (const [key, value] of Object.entries(labelObj)) {
  //   console.log(`${key}: ${value}`);
  // }

  // TODO: array to JSON items, eg: [ K-3001: Halden, K-3002: Moss ] -> {'K-3001': 'Halden'},{'K-3002': 'Moss'}
  // TODO: labelled JSON items, eg: {'K-3001', 'Halden'},{'K-3002': 'Moss'} -> {'municipalityNumber': 'K-3001', 'municipalityName':'Halden'}, {'municipalityNumber': 'K-3002', 'municipalityName':'Moss'}
  // TODO: extend JSON to have population using Object.assign(), eg: {'municipalityNumber': 'K-3001', 'municipalityName':'Halden', 'population': 31444 },{'municipalityNumber': 'K-3002', 'municipalityName':'Moss', 'K-3002': 'Moss', 'population': 50290}

  data.value.forEach((item) => {
    console.log(`[LOG population] ${count}: ${item}`);
    count++;
  });
};

getPopulationByMunicipalityFromGeoNorge();
