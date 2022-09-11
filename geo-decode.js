import fetch from "node-fetch";

const getLatLongFromGeoNorge = async (address) => {
  // example address: { zip: "0167", city: "Oslo", street: "Wergelandsveien 15"} ->  "Wergelandsveien 15, 0167, Oslo"
  console.log(address);

  if (!address || !address.street || !address.zip || !address.city) {
    return;
  }

  const searchParams = new URLSearchParams();
  searchParams.set("fuzzy", "false");
  searchParams.set("adressetekst", address.street);
  searchParams.set("postnummer", address.zip.toString());
  searchParams.set("poststed", address.city);
  searchParams.set("utkoordsys", "4258");
  searchParams.set("treffPerSide", "10");
  searchParams.set("side", "0");
  searchParams.set("asciiKompatibel", "true");

  // Ref: https://kartkatalog.geonorge.no/metadata/adresse-rest-api/44eeffdc-6069-4000-a49b-2d6bfc59ac61

  const response = await fetch(
    `https://ws.geonorge.no/adresser/v1/sok?${searchParams}`
  );
  const data = await response.json();

  return data;
};

export const printAddressToConsole = (address) => {
  getLatLongFromGeoNorge(address).then((data) =>
    // { epsg: 'EPSG:4258', lat: 59.919244748168225, lon: 10.731070562579866 }

    console.log(data?.adresser[0]?.representasjonspunkt)
  );
};
