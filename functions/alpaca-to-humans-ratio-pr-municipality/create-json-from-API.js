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

  /*   const body = {
    query: [
      {
        code: "Region",
        selection: {
          filter: "vs:Landet",
          values: [],
        },
      },
      {
        code: "Alder",
        selection: {
          filter: "vs:AlleAldre00B",
          values: [],
        },
      },
      {
        code: "Tid",
        selection: {
          filter: "item",
          values: ["2022"],
        },
      },
    ],
    response: {
      format: "json-stat2",
    },
  }; */

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
    "[LOG]: data.dimension.Region.category.label",
    data.dimension.Region.category.label
  );

  console.log("[LOG] data.value items");

  data.value.forEach((item) => {
    console.log(`[LOG] ${count}: ${item}`);
    count++;
  });
};

getPopulationByMunicipalityFromGeoNorge();
