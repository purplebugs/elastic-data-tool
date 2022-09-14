// Ref: https://www.ssb.no/statbank/table/07459/tableViewLayout1/

// TODO correlate Region eg K-3004 with "kommunenummer": "3004" from geonorge
// In this example "kommunenummer": "3004" is "kommunenavn": "FREDRIKSTAD"
// See file: geo-decode.js that uses https://ws.geonorge.no/adresser/v1/#/default/get_sok

// TODO formulate API request for this instead of downloaded file, using
// POST request to URL: https://data.ssb.no/api/v0/no/table/07459/
// POST body in file: functions/alpaca-to-humans-ratio-pr-municipality/query-body.json

import fetch from "node-fetch";

export const getPopulationByMunicipalityFromGeoNorge = async () => {
  // kommuner = municipalities

  const body = {
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
  };

  const response = await fetch("https://data.ssb.no/api/v0/no/table/07459/", {
    method: "post",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();
  console.log(data);
};

getPopulationByMunicipalityFromGeoNorge();