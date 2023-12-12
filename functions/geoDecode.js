// external
import { Client } from "@googlemaps/google-maps-services-js";
import axios from "axios";
import lookup from "country-code-lookup";

// internal
import { toGoogleDirectionsURL } from "../functions/urlTransformer.js";

const cache = new Map();

const overrideNullCountryCode = (original_code) => {
  return original_code ? original_code : "NO";
};

const lookupCountryCode = (original_code) => {
  const code = overrideNullCountryCode(original_code);
  return lookup.byIso(code).country;
};
const googleGeoCode = async (address) => {
  const client = new Client({});
  return await client.geocode(
    {
      params: {
        address: address,
        key: process.env.GOOGLE_MAPS_API_KEY,
      },
      timeout: 1000, // milliseconds
    },
    axios
  );
};

export const transformWithGoogleAddress = (alpacaObject, googleResult) => {
  const latitude = googleResult?.geometry?.location?.lat || null;
  const longitude = googleResult?.geometry?.location?.lng || null;
  const formatted_address = googleResult?.formatted_address || null;
  const place_id = googleResult?.place_id || null;

  let administrative_area_level_1 = null;
  let administrative_area_level_2 = null;
  googleResult?.address_components?.forEach((component) => {
    if (component?.types?.find((type) => type === "administrative_area_level_1")) {
      administrative_area_level_1 = component?.long_name;
    }
    if (component?.types?.find((type) => type === "administrative_area_level_2")) {
      administrative_area_level_2 = component?.long_name;
    }
  });

  // https://www.elastic.co/guide/en/elasticsearch/reference/current/geo-point.html
  // Geopoint as an object using GeoJSON format

  const obj = {
    location: {
      type: "Point",
      coordinates: [longitude, latitude],
      google: {
        formatted_address: formatted_address,
        place_id: place_id,
        directions_url_href: toGoogleDirectionsURL(formatted_address).href,
        administrative_area_level_1: administrative_area_level_1,
        administrative_area_level_2: administrative_area_level_2,
      },
      original: {
        keeper: alpacaObject?.keeper,
        keeperName: alpacaObject?.keeperName,
        street: alpacaObject?.street,
        city: alpacaObject?.city,
        zip: alpacaObject?.zip,
        country_code_original: alpacaObject?.country,
        country_code: overrideNullCountryCode(alpacaObject?.country),
        country_name: lookupCountryCode(overrideNullCountryCode(alpacaObject?.country)),
      },
    },
  };

  cache.set(alpacaObject.keeper, obj);
  console.log(`[LOG] Location ${alpacaObject.keeper} added to cache`);

  return obj;
};

export const getLatLngFromAddress = async (alpacaObject) => {
  const keeperName = alpacaObject?.keeperName || "";
  const street = alpacaObject?.street || "";
  const zip = alpacaObject?.zip || "";
  const city = alpacaObject?.zip || "";
  const country = lookupCountryCode(alpacaObject?.country);
  let address = `${street}, ${zip} ${city}, ${country}`;
  console.log("---- address ", address);

  if (!alpacaObject || !alpacaObject.keeper) {
    return {};
  }

  if (cache.has(alpacaObject.keeper)) {
    console.log(`[LOG] Using location ${alpacaObject.keeper} from cache`);
    return cache.get(alpacaObject.keeper);
  }

  console.log(`[LOG] Retrieving location ${alpacaObject.keeper} from API`);

  // Use geocoding from https://github.com/googlemaps/google-maps-services-js
  // Ref: https://developers.google.com/maps/documentation/geocoding/overview#how-the-geocoding-api-works
  // Ref: https://developers.google.com/maps/documentation/geocoding/requests-geocoding

  let data = null;

  try {
    let response = null;
    response = await googleGeoCode(address);

    if (response?.data?.status === "OK") {
      // Example: "keeperName": "Alpakkahagen",
      // Bingenveien 35, 1923 Sørum, Norway -> finds exact match

      data = response?.data?.results[0] || null; // Use first result only
      // console.log("---- 1- data ", JSON.stringify(data, null, 2));
    }

    if (data?.partial_match == true) {
      // Example: "keeperName": "Oddan Alpakka"
      // "Lernestranda 912, 7200 Kyrksæterøra, Norway" -> resolves to nearby town instead of street because street spelling "Lernestranda" does not match Google street "Lernesstranda"
      // Adding keeperName -> finds farm street address "Lernesstranda"

      console.log(" PARTIAL MATCH TRUE ---- 2 - address ", `${alpacaObject.keeperName}, ${address}`);

      response = await googleGeoCode(`${keeperName}, ${address}`);
    }

    if (response?.data?.status === "OK") {
      data = response?.data?.results[0] || null; // Use first result only
      // console.log("---- 2- data ", JSON.stringify(data, null, 2));
    }
  } catch (error) {
    console.error(error);
    throw new Error("🧨 getLatLngFromAddress: Response from Google Geocode API failed");
  }

  const obj = transformWithGoogleAddress(alpacaObject, data);

  return obj;
};
