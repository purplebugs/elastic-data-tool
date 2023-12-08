import { describe, it, mock } from "node:test";
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
          long_name: "33",
          short_name: "33",
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
      formatted_address: "Bingenveien 33, 1923 Sørum, Norway",
      geometry: {
        location: {
          lat: 60.00786649999999,
          lng: 11.2232683,
        },
        location_type: "ROOFTOP",
        viewport: {
          northeast: {
            lat: 60.0091541802915,
            lng: 11.2245501802915,
          },
          southwest: {
            lat: 60.0064562197085,
            lng: 11.2218522197085,
          },
        },
      },
      partial_match: true,
      place_id: "ChIJrZVJkQHWQ0YRjmnqc_FgDpY",
      plus_code: {
        compound_code: "265F+48 Lillestrøm, Norway",
        global_code: "9FGH265F+48",
      },
      types: ["establishment", "point_of_interest"],
    };

    // ACT
    const actual = transformWithGoogleAddress(object, googleResult);

    // ASSERT
    const expected = {
      location: {
        coordinates: [11.2232683, 60.00786649999999],
        type: "Point",
        google: {
          formatted_address: "Bingenveien 33, 1923 Sørum, Norway",
          place_id: "ChIJrZVJkQHWQ0YRjmnqc_FgDpY",
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
