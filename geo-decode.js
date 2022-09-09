import fetch from "node-fetch";

const addressJSONtoString = (address) => {
  // { Zip: "0167", City: "Oslo", Street: "Wergelandsveien 15"} ->  "Wergelandsveien 15, 0167, Oslo"
  return `${address["Street"]}, ${address["Zip"]}, ${address["City"]}`;
};

const getLatLongFromGeoNorge = async (address) => {
  console.log(address);

  // Ref: https://kartkatalog.geonorge.no/metadata/adresse-rest-api/44eeffdc-6069-4000-a49b-2d6bfc59ac61

  // TODO: Improve search using postnummer https://ws.geonorge.no/adresser/v1/sok?sok=Wergelandsveien%2015%2C%20Oslo&fuzzy=false&postnummer=0167&utkoordsys=4258&treffPerSide=10&side=0&asciiKompatibel=true

  const response = await fetch(
    `https://ws.geonorge.no/adresser/v1/sok?sok=${address}&fuzzy=false&utkoordsys=4258&treffPerSide=10&side=0&asciiKompatibel=true`
  );
  const data = await response.json();

  return data;
};

export const printAddressToConsole = (address) => {
  getLatLongFromGeoNorge(addressJSONtoString(address)).then((data) =>
    // { epsg: 'EPSG:4258', lat: 59.919244748168225, lon: 10.731070562579866 }

    console.log(data?.adresser[0]?.representasjonspunkt)
  );
};
