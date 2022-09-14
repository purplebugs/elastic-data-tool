import fetch from "node-fetch";

const cache = new Map();

export const getLatLongFromGeoNorge = async (alpacaObject) => {
  if (
    !alpacaObject ||
    !alpacaObject.keeper ||
    !alpacaObject.street ||
    !alpacaObject.zip ||
    !alpacaObject.city
  ) {
    return {};
  }

  if (cache.has(alpacaObject.keeper)) {
    console.log(`[LOG] Using ${alpacaObject.keeper} from cache`);
    return cache.get(alpacaObject.keeper);
  }

  // example address: { zip: "0167", city: "Oslo", street: "Wergelandsveien 15"} ->  "Wergelandsveien 15, 0167, Oslo"
  console.log(alpacaObject);

  const searchParams = new URLSearchParams();
  searchParams.set("fuzzy", "false");
  searchParams.set("adressetekst", alpacaObject.street);
  searchParams.set("postnummer", alpacaObject.zip.toString());
  searchParams.set("poststed", alpacaObject.city);
  searchParams.set("utkoordsys", "4258");
  searchParams.set("treffPerSide", "10");
  searchParams.set("side", "0");
  searchParams.set("asciiKompatibel", "true");

  console.log(`[LOG] Retrieving location ${alpacaObject.keeper} from API`);

  // Ref: https://kartkatalog.geonorge.no/metadata/adresse-rest-api/44eeffdc-6069-4000-a49b-2d6bfc59ac61
  // https://ws.geonorge.no/adresser/v1/

  const response = await fetch(
    `https://ws.geonorge.no/adresser/v1/sok?${searchParams}`
  );
  const data = await response.json();

  // TODO - if address not found use fuzzy search format below and grab first result since this solves at least one of the missing address cases
  // https://ws.geonorge.no/adresser/v1/sok?sok=myStreet 123, My town name, fuzzy=true&postnummer=7200&utkoordsys=4258&treffPerSide=10&side=0&asciiKompatibel=true

  // "representasjonspunkt": { "epsg": "EPSG:4258", "lat": 59.295708720373376, "lon": 10.97662911768462 }
  const latitude = data?.adresser[0]?.representasjonspunkt.lat || null;
  const longitude = data?.adresser[0]?.representasjonspunkt.lon || null;

  // "kommunenummer": "3004",
  // "kommunenavn": "FREDRIKSTAD",
  const kommunenummer = data?.adresser[0]?.kommunenummer || null;
  const kommunenavn = data?.adresser[0]?.kommunenavn || null;

  // https://www.elastic.co/guide/en/elasticsearch/reference/8.4/geo-point.html
  // Geopoint expressed as an object, in GeoJSON format, with type and coordinates keys.

  const obj = {
    location: {
      type: "Point",
      coordinates: [longitude, latitude],
      kommunenummer: kommunenummer,
      kommunenavn: kommunenavn,
    },
  };

  console.log(obj);

  cache.set(alpacaObject.keeper, obj);
  console.log(`[LOG] Location ${alpacaObject.keeper} added to cache`);

  return obj;
};
