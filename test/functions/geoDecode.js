import { describe, it } from "node:test";
import { strict as assert } from "node:assert";
import { overrideNullCountryCode, transformWithGoogleAddress } from "../../functions/geoDecode.js";

describe("Override missing code", async () => {
  it(`should override null country code with "NO"`, async () => {
    // ARRANGE
    const country = null;

    // ACT
    const actual = overrideNullCountryCode(country);

    // ASSERT
    const expected = "NO";

    assert.equal(actual, expected);
  });

  it(`should override undefined country code with "NO"`, async () => {
    // ARRANGE
    const country = undefined;

    // ACT
    const actual = overrideNullCountryCode(country);

    // ASSERT
    const expected = "NO";

    assert.equal(actual, expected);
  });

  it(`should override "" country code with "NO"`, async () => {
    // ARRANGE
    const country = "";

    // ACT
    const actual = overrideNullCountryCode(country);

    // ASSERT
    const expected = "NO";

    assert.equal(actual, expected);
  });
});

describe("Geo decoder - transform address string to Google place, lat, lng", async () => {
  it("should transform object with only keeper name field from google result - explicit TEXT_SEARCH google API format", async () => {
    // ARRANGE
    const object = {
      keeper: 35,
      keeperName: "Killingmo alpakka",
      street: null,
      city: null,
      zip: null,
    };

    const googleResult = {
      id: "ChIJm_xEk_zQQ0YRxXYynsAKgvA",
      formattedAddress: "Killingmobakken 46, Killingmo Gård, 1930 Aurskog, Norway",
      addressComponents: [
        {
          longText: "Aurskog",
          shortText: "Aurskog",
          types: ["postal_town"],
          languageCode: "no",
        },
        {
          longText: "Aurskog-Høland",
          shortText: "Aurskog-Høland",
          types: ["administrative_area_level_2", "political"],
          languageCode: "no",
        },
        {
          longText: "Viken",
          shortText: "Viken",
          types: ["administrative_area_level_1", "political"],
          languageCode: "no",
        },
        {
          longText: "Norway",
          shortText: "NO",
          types: ["country", "political"],
          languageCode: "en",
        },
        {
          longText: "1930",
          shortText: "1930",
          types: ["postal_code"],
          languageCode: "en-US",
        },
      ],
      location: {
        latitude: 59.94536239999999,
        longitude: 11.405358,
      },
      googleMapsUri: "https://maps.google.com/?cid=17330426138479195845",
      displayName: {
        text: "Killingmo Alpakka Gård",
        languageCode: "no",
      },
    };

    // ACT
    const actual = transformWithGoogleAddress(object, googleResult, "TEXT_SEARCH");

    // ASSERT
    const expected = {
      location: {
        type: "Point",
        coordinates: [11.405358, 59.94536239999999],
        google: {
          formatted_address: "Killingmobakken 46, Killingmo Gård, 1930 Aurskog, Norway",
          place_id: "ChIJm_xEk_zQQ0YRxXYynsAKgvA",
          directions_url_href:
            "https://www.google.com/maps/dir/?api=1&origin=&destination=Killingmobakken%2046,%20Killingmo%20G%C3%A5rd,%201930%20Aurskog,%20Norway",
          administrative_area_level_1: "Viken",
          administrative_area_level_2: "Aurskog-Høland",
        },
        original: {
          keeper: 35,
          keeperName: "Killingmo alpakka",
          street: null,
          city: null,
          zip: null,
          country_code_original: undefined,
          country_code: "NO",
          country_name: "Norway",
        },
      },
    };

    assert.deepEqual(actual, expected);
  });

  it("should transform object with address fields - implicit GEOCODE google API format", async () => {
    // ARRANGE
    const object = {
      keeper: 61,
      keeperName: "Alpakkahagen",
      street: "Bingenveien 35",
      city: "Sørum",
      zip: "1923",
      country: "NO",
    };

    const googleResult = {
      address_components: [
        {
          long_name: "35",
          short_name: "35",
          types: ["street_number"],
        },
        {
          long_name: "Bingenveien",
          short_name: "Bingenveien",
          types: ["route"],
        },
        {
          long_name: "Sørum",
          short_name: "Sørum",
          types: ["postal_town"],
        },
        {
          long_name: "Lillestrøm",
          short_name: "Lillestrøm",
          types: ["administrative_area_level_2", "political"],
        },
        {
          long_name: "Viken",
          short_name: "Viken",
          types: ["administrative_area_level_1", "political"],
        },
        {
          long_name: "Norway",
          short_name: "NO",
          types: ["country", "political"],
        },
        {
          long_name: "1923",
          short_name: "1923",
          types: ["postal_code"],
        },
      ],
      formatted_address: "Bingenveien 35, 1923 Sørum, Norway",
      geometry: {
        bounds: {
          northeast: {
            lat: 60.0075655,
            lng: 11.2230422,
          },
          southwest: {
            lat: 60.0074434,
            lng: 11.222848,
          },
        },
        location: {
          lat: 60.0075085,
          lng: 11.2229125,
        },
        location_type: "ROOFTOP",
        viewport: {
          northeast: {
            lat: 60.00888318029151,
            lng: 11.2244207302915,
          },
          southwest: {
            lat: 60.00618521970849,
            lng: 11.2217227697085,
          },
        },
      },
      place_id: "ChIJn_8GjgHWQ0YRZcYaf8f3180",
      types: ["premise"],
    };

    // ACT
    const actual = transformWithGoogleAddress(object, googleResult);

    // ASSERT
    const expected = {
      location: {
        coordinates: [11.2229125, 60.0075085],
        type: "Point",
        google: {
          formatted_address: "Bingenveien 35, 1923 Sørum, Norway",
          place_id: "ChIJn_8GjgHWQ0YRZcYaf8f3180",
          directions_url_href:
            "https://www.google.com/maps/dir/?api=1&origin=&destination=Bingenveien%2035,%201923%20S%C3%B8rum,%20Norway",
          administrative_area_level_1: "Viken",
          administrative_area_level_2: "Lillestrøm",
        },
        original: {
          keeper: 61,
          keeperName: "Alpakkahagen",
          street: "Bingenveien 35",
          city: "Sørum",
          zip: "1923",
          country_code_original: "NO",
          country_code: "NO",
          country_name: "Norway",
        },
      },
    };

    assert.deepEqual(actual, expected);
  });
});
