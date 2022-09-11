import fetch from "node-fetch";

export const getLatLongFromGeoNorge = async (alpacaObject) => {
  // example address: { zip: "0167", city: "Oslo", street: "Wergelandsveien 15"} ->  "Wergelandsveien 15, 0167, Oslo"
  console.log(alpacaObject);

  if (
    !alpacaObject ||
    !alpacaObject.street ||
    !alpacaObject.zip ||
    !alpacaObject.city
  ) {
    return {};
  }

  const searchParams = new URLSearchParams();
  searchParams.set("fuzzy", "false");
  searchParams.set("adressetekst", alpacaObject.street);
  searchParams.set("postnummer", alpacaObject.zip.toString());
  searchParams.set("poststed", alpacaObject.city);
  searchParams.set("utkoordsys", "4258");
  searchParams.set("treffPerSide", "10");
  searchParams.set("side", "0");
  searchParams.set("asciiKompatibel", "true");

  // Ref: https://kartkatalog.geonorge.no/metadata/adresse-rest-api/44eeffdc-6069-4000-a49b-2d6bfc59ac61

  const response = await fetch(
    `https://ws.geonorge.no/adresser/v1/sok?${searchParams}`
  );
  const data = await response.json();

  // { epsg: 'EPSG:4258', lat: 59.919244748168225, lon: 10.731070562579866 }
  const latitude = data?.adresser[0]?.representasjonspunkt.lat || {};
  const longitude = data?.adresser[0]?.representasjonspunkt.lon || {};
  const obj = { latitude, longitude };
  console.log(obj);
  return obj;
};
