import { describe, it } from "node:test";
import { strict as assert } from "node:assert";
import { transformWithGoogleAddress } from "../../functions/geoDecode.js";

describe("Geo decoder - transform address string to Google place, lat, lng", async () => {
  it("should transform object with address fields from google result", async () => {
    // ARRANGE
    const object = {
      keeper: 61,
      keeperName: "Alpakkahagen",
      street: "Bingenveien 35",
      city: "Sørum",
      zip: "1923",
      country_code: "",
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
        },
        original: {
          keeper: 61,
          keeperName: "Alpakkahagen",
          street: "Bingenveien 35",
          city: "Sørum",
          zip: "1923",
          country_code_original: undefined,
          country_code: "NO",
          country_name: "Norway",
        },
      },
    };

    assert.deepEqual(actual, expected);
  });
});
