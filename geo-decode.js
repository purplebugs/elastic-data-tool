import fetch from "node-fetch";

const addressToConvertToLatLong = "Risåsvegen 71, 2436, Våler i Solør";

const getLatLongFromGeoNorge = async (address) => {
  // https://ws.geonorge.no/stedsnavn/v1/#/default/get_sted

  console.log(address);

  // sokeStreng: 'sok=Ris%C3%A5svegen%2071,%202436,%20V%C3%A5ler%20i%20Sol%C3%B8r&fuzzy=true&utkoordsys=4258&treffPerSide=10&side=1'

  const response = await fetch(
    `https://ws.geonorge.no/stedsnavn/v1/sted?sok=${address}&fuzzy=true&utkoordsys=4258&treffPerSide=10&side=1`
  );
  const data = await response.json();

  return data;
};

getLatLongFromGeoNorge(addressToConvertToLatLong).then((data) =>
  // Example response: { 'øst': 11.77152, nord: 60.68571, koordsys: 4258 }

  console.log(data?.navn[0]?.representasjonspunkt)
);
