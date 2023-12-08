import { Client } from "@googlemaps/google-maps-services-js";
import axios from "axios";
import lookup from "country-code-lookup";

const cache = new Map();

export const transformWithGoogleAddress = (alpacaObject, googleResult) => {
  const latitude = googleResult?.geometry?.location?.lat || null;
  const longitude = googleResult?.geometry?.location?.lng || null;
  const formatted_address = googleResult?.formatted_address || null;
  const place_id = googleResult?.place_id || null;

  const code = alpacaObject.country ? alpacaObject.country : "NO";
  const country = lookup.byIso(code);

  // https://www.elastic.co/guide/en/elasticsearch/reference/current/geo-point.html
  // Geopoint as an object using GeoJSON format

  const obj = {
    location: {
      type: "Point",
      coordinates: [longitude, latitude],
      google: { formatted_address: formatted_address, place_id: place_id },
      original: {
        keeper: alpacaObject.keeper,
        keeperName: alpacaObject.keeperName,
        street: alpacaObject.street,
        city: alpacaObject.city,
        zip: alpacaObject.zip,
        country_code_original: alpacaObject?.country,
        country_code: code,
        country_name: country.country,
      },
    },
  };

  // console.debug(obj);

  cache.set(alpacaObject.keeper, obj);
  console.log(`[LOG] Location ${alpacaObject.keeper} added to cache`);

  return obj;
};

export const getLatLngFromAddress = async (alpacaObject) => {
  if (!alpacaObject || !alpacaObject.keeper) {
    return {};
  }

  if (cache.has(alpacaObject.keeper)) {
    console.log(`[LOG] Using location ${alpacaObject.keeper} from cache`);
    return cache.get(alpacaObject.keeper);
  }

  // console.debug(alpacaObject);

  console.log(`[LOG] Retrieving location ${alpacaObject.keeper} from API`);

  // Use geocoding from https://github.com/googlemaps/google-maps-services-js
  // Ref: https://developers.google.com/maps/documentation/geocoding/overview#how-the-geocoding-api-works
  // Ref: https://developers.google.com/maps/documentation/geocoding/requests-geocoding

  const client = new Client({});
  let data = null;

  const code = alpacaObject.country ? alpacaObject.country : "NO"; // TODO refactor into one shared function
  const country = lookup.byIso(code);

  try {
    const response = await client.geocode(
      {
        params: {
          address: `${alpacaObject.keeperName}, ${alpacaObject.street}, ${alpacaObject.zip} ${alpacaObject.city}, ${country.country}`,
          key: process.env.GOOGLE_MAPS_API_KEY,
        },
        timeout: 1000, // milliseconds
      },
      axios
    );

    if (response?.data?.status === "OK") {
      data = response?.data || null;
    }
  } catch (error) {
    console.error(error);
    throw new Error("🧨 getLatLngFromAddress: Response from Google Geocode API failed");
  }

  // TODO store long_name for administrative_area_level_1, administrative_area_level_2 from address_components
  // console.log(JSON.stringify(data?.results[0], null, 2));

  const obj = transformWithGoogleAddress(alpacaObject, data?.results[0]); // Use first result only

  return obj;
};
