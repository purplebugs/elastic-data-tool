import { Client } from "@googlemaps/google-maps-services-js";
import axios from "axios";

const cache = new Map();

export const getLatLngFromGoogleGeocodingAPI = async (alpacaObject) => {
  if (!alpacaObject || !alpacaObject.keeper || !alpacaObject.street || !alpacaObject.zip || !alpacaObject.city) {
    return {};
  }

  if (cache.has(alpacaObject.keeper)) {
    console.log(`[LOG] Using location ${alpacaObject.keeper} from cache`);
    return cache.get(alpacaObject.keeper);
  }

  // example address: { zip: "0167", city: "Oslo", street: "Wergelandsveien 15"} ->  "Wergelandsveien 15, 0167, Oslo"
  // console.debug(alpacaObject);

  console.log(`[LOG] Retrieving location ${alpacaObject.keeper} from API`);

  // Use geocoding from https://github.com/googlemaps/google-maps-services-js
  // Ref: https://developers.google.com/maps/documentation/geocoding/overview
  // Ref: https://developers.google.com/maps/documentation/geocoding/requests-geocoding

  const client = new Client({});
  const response = await client.geocode(
    {
      params: {
        address: [`${alpacaObject.street} ${alpacaObject.zip.toString()} ${alpacaObject.city}`],
        key: process.env.GOOGLE_MAPS_API_KEY,
      },
      timeout: 1000, // milliseconds
    },
    axios
  );

  const data = response.data;

  const latitude = data?.results[0]?.geometry?.location?.lat || null;
  const longitude = data?.results[0]?.geometry?.location?.lng || null;
  const formatted_address = data?.results[0]?.formatted_address || null;
  const place_id = data?.results[0]?.place_id || null;

  // https://www.elastic.co/guide/en/elasticsearch/reference/current/geo-point.html
  // Geopoint as an object using GeoJSON format

  const obj = {
    location: {
      type: "Point",
      coordinates: [longitude, latitude],
      google: { formatted_address: formatted_address, place_id: place_id }, // TODO add to farms indices, add mappings
    },
  };

  // console.debug(obj);

  cache.set(alpacaObject.keeper, obj);
  console.log(`[LOG] Location ${alpacaObject.keeper} added to cache`);

  return obj;
};
