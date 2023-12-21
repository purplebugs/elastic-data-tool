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

const googleTextSearch = async (address) => {
  // https://developers.google.com/maps/documentation/geocoding/best-practices
  // Use the Places API Place Autocomplete service when geocoding ambiguous (incomplete) addresses

  // Ref: https://developers.google.com/maps/documentation/places/web-service/text-search
  // eg: requests that include non-address components such as business names

  const client = new Client({});

  /*
  TODO
  
  return
   
  POST https://places.googleapis.com/v1/places:searchText

  client.textSearch()

  X-Goog-Api-Key: process.env.GOOGLE_MAPS_API_KEY
  X-Goog-FieldMask: places.id,places.formattedAddress,places.addressComponents,places.googleMapsUri,places.displayName
  Content-Type: application/json

  {
    "textQuery" : "Alpakkahagen, Norway"
  }

  */

const googleGeoCode = async (address) => {
  // https://developers.google.com/maps/documentation/geocoding/best-practices
  // Use the Geocoding API when geocoding complete addresses (for example, “48 Pirrama Rd, Pyrmont, NSW, Australia”)

  // Ref: https://developers.google.com/maps/documentation/geocoding/overview#how-the-geocoding-api-works

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
  const keeperName = alpacaObject?.keeperName ? alpacaObject?.keeperName + ", " : "";
  const street = alpacaObject?.street ? alpacaObject?.street + ", " : "";
  const zip = alpacaObject?.zip ? alpacaObject?.zip + " " : "";
  const city = alpacaObject?.city ? alpacaObject?.city + ", " : "";
  const country = lookupCountryCode(alpacaObject?.country);
  let address = `${street}${zip}${city}${country}`;

  if (keeperName !== "" && street === "" && city === "" && zip === "") {
    address = `${keeperName}${address}`;
  }

  if (!alpacaObject || !alpacaObject.keeper) {
    return {};
  }

  if (cache.has(alpacaObject.keeper)) {
    console.log(`[LOG] Using location ${alpacaObject.keeper} from cache`);
    return cache.get(alpacaObject.keeper);
  }

  console.log(`[LOG] Retrieving location ${alpacaObject.keeper} from API`);

  let data = null;

  try {
    let response = null;

    // Example: "keeperName": "Alpakkahagen",
    // Bingenveien 35, 1923 Sørum, Norway -> finds exact match
    response = await googleGeoCode(address);

    if (response?.data?.status === "OK") {
      data = response?.data?.results[0] || null; // Use first result only
    }

    if (data?.partial_match === true) {
      // Example: "keeperName": "Oddan Alpakka"
      // "Lernestranda 912, 7200 Kyrksæterøra, Norway" -> resolves to nearby town instead of street because street spelling "Lernestranda" does not match Google street "Lernesstranda"
      // Adding keeperName -> finds farm street address "Lernesstranda"

      const responseUsingKeeper = await googleGeoCode(`${keeperName}${address}`);

      if (responseUsingKeeper?.data?.results[0].formatted_address !== "Norway") {
        // Only use if finds an address besides fallback of centre of Norway
        // This avoids issue with "keeper": 218 which had partial match with valid address, then google found no match when adding keeper
        response = responseUsingKeeper;
      }
    }

    if (response?.data?.status === "OK") {
      data = response?.data?.results[0] || null; // Use first result only
    }
  } catch (error) {
    console.error(error);
    throw new Error("🧨 getLatLngFromAddress: Response from Google Geocode API failed");
  }

  const obj = transformWithGoogleAddress(alpacaObject, data);

  return obj;
};
