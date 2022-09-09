import fetch from "node-fetch";

const addressJSON = {
  Zip: "0167",
  City: "Oslo",
  Street: "Wergelandsveien 15",
};

const addressJSONtoString = (address) => {
  // { Zip: "0167", City: "Oslo", Street: "Wergelandsveien 15"} ->  "Wergelandsveien 15, 0167, Oslo"
  return `${address["Street"]}, ${address["Zip"]}, ${address["City"]}`;
};

const getLatLongFromGeoNorge = async (address) => {
  console.log(address);

  // Ref: https://kartkatalog.geonorge.no/metadata/adresse-rest-api/44eeffdc-6069-4000-a49b-2d6bfc59ac61

  const response = await fetch(
    `https://ws.geonorge.no/adresser/v1/sok?sok=${address}&fuzzy=false&utkoordsys=4258&treffPerSide=10&side=0&asciiKompatibel=true`
  );
  const data = await response.json();

  return data;
};

getLatLongFromGeoNorge(addressJSONtoString(addressJSON)).then((data) =>
  // { epsg: 'EPSG:4258', lat: 59.919244748168225, lon: 10.731070562579866 }

  console.log(data?.adresser[0]?.representasjonspunkt)
);
