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

  try {
    let response = null;
    let data = null;

    // Does not use a google client because of https://github.com/googlemaps/google-maps-services-js/issues/1105

    response = await axios.post(
      "https://places.googleapis.com/v1/places:searchText",
      {
        textQuery: address,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": process.env.GOOGLE_MAPS_API_KEY,
          "X-Goog-FieldMask":
            "places.id,places.formattedAddress,places.addressComponents,places.googleMapsUri,places.displayName",
        },
      }
    );

    if (response?.statusText === "OK") {
      data = response?.data?.places[0] || null; // Use first result only
    }

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("🧨 googleTextSearch: Could not get results from Google API");
  }
};

const googleGeoCode = async (address) => {
  // https://developers.google.com/maps/documentation/geocoding/best-practices
  // Use the Geocoding API when geocoding complete addresses (for example, “48 Pirrama Rd, Pyrmont, NSW, Australia”)

  // Ref: https://developers.google.com/maps/documentation/geocoding/overview#how-the-geocoding-api-works

  try {
    const client = new Client({});

    let response = null;
    let data = null;

    response = await client.geocode(
      {
        params: {
          address: address,
          key: process.env.GOOGLE_MAPS_API_KEY,
        },
        timeout: 1000, // milliseconds
      },
      axios
    );

    if (response?.data?.status === "OK") {
      data = response?.data?.results[0] || null; // Use first result only
    }

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("🧨 googleGeoCode: Could not get results from Google API");
  }
};

export const transformWithGoogleAddress = (alpacaObject, googleResult, googleAPI = "GEOCODE") => {
  try {
    let latitude = null;
    let longitude = null;
    let formatted_address = null;
    let place_id = null;
    let administrative_area_level_1 = null;
    let administrative_area_level_2 = null;

    if (googleAPI === "GEOCODE") {
      latitude = googleResult?.geometry?.location?.lat || null;
      longitude = googleResult?.geometry?.location?.lng || null;
      formatted_address = googleResult?.formatted_address || null;
      place_id = googleResult?.place_id || null;
    }

    googleResult?.address_components?.forEach((component) => {
      if (component?.types?.find((type) => type === "administrative_area_level_1")) {
        if (googleAPI === "GEOCODE") {
          administrative_area_level_1 = component?.long_name;
        }
      }
      if (component?.types?.find((type) => type === "administrative_area_level_2")) {
        if (googleAPI === "GEOCODE") {
          administrative_area_level_2 = component?.long_name;
        }
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
  } catch (error) {
    console.error(error);
    throw new Error("🧨 transformWithGoogleAddress");
  }
};

export const getLatLng_GoogleAddress_FromAddress = async (alpacaObject) => {
  try {
    const keeperName = alpacaObject?.keeperName ? alpacaObject?.keeperName + ", " : "";
    const street = alpacaObject?.street ? alpacaObject?.street + ", " : "";
    const zip = alpacaObject?.zip ? alpacaObject?.zip + " " : "";
    const city = alpacaObject?.city ? alpacaObject?.city + ", " : "";
    const country = lookupCountryCode(alpacaObject?.country);
    let address = `${street}${zip}${city}${country}`;

    if (!alpacaObject || !alpacaObject.keeper) {
      console.log(`[LOG] No info - returning empty object`);
      return {};
    }

    if (cache.has(alpacaObject.keeper)) {
      console.log(`[LOG] Using location ${alpacaObject.keeper} from cache`);
      return cache.get(alpacaObject.keeper);
    }

    console.log(`[LOG] Retrieving location ${alpacaObject.keeper} from API`);

    if (keeperName !== "" && street === "" && city === "" && zip === "") {
      address = `${keeperName}${address}`;
    }

    let data = null;

    // Example: "keeperName": "Alpakkahagen",
    // Bingenveien 35, 1923 Sørum, Norway -> finds exact match
    data = await googleGeoCode(address);

    if (data?.partial_match === true) {
      // Example: "keeperName": "Oddan Alpakka"
      // "Lernestranda 912, 7200 Kyrksæterøra, Norway" -> resolves to nearby town instead of street because street spelling "Lernestranda" does not match Google street "Lernesstranda"
      // Adding keeperName -> finds farm street address "Lernesstranda"

      const dataUsingKeeperName = await googleGeoCode(`${keeperName}${address}`);

      if (data.formatted_address !== "Norway") {
        // Only use if finds an address besides fallback of centre of Norway
        // This avoids issue with "keeper": 218 which had partial match with valid address, then google found no match when adding keeper
        data = dataUsingKeeperName;
      }
    }

    const obj = transformWithGoogleAddress(alpacaObject, data, "GEOCODE");

    return obj;
  } catch (error) {
    console.error(error);
    throw new Error("🧨 getLatLng_GoogleAddress_FromAddress");
  }
};
