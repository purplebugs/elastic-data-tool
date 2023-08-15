import { describe, it } from "node:test";
import { strict as assert } from "node:assert";
import { farmsFromAlpacas } from "../../functions/farmsFromAlpacas.js";

describe("Farms from alpacas transformer", async () => {
  it("should transform list of alpacas to list of farms with alpaca count", async () => {
    // ARRANGE
    const alpacaDetailsArray = [
      {
        alpacaId: 123,
        companyId: 111,
        keeperName: "Farm one",
        location: { type: "Point", coordinates: [null, null], kommunenummer: null, kommunenavn: null },
      },
      {
        alpacaId: 456,
        companyId: 111,
        keeperName: "Farm one",
        location: { type: "Point", coordinates: [null, null], kommunenummer: null, kommunenavn: null },
      },
      {
        alpacaId: 789,
        companyId: 222,
        keeperName: "Farm two",
        location: {
          type: "Point",
          coordinates: [10.97662911768462, 59.295708720373376],
          kommunenummer: "3004",
          kommunenavn: "FREDRIKSTAD",
        },
      },
    ];

    // ACT
    const result = farmsFromAlpacas(alpacaDetailsArray);

    // ASSERT

    const expected = [
      { id: 111, name: "Farm one", lat: null, lng: null, countOfAlpacas: 2 },
      {
        id: 222,
        name: "Farm two",
        lat: null,
        lng: null,
        countOfAlpacas: 1,
        lat: 59.295708720373376,
        lng: 10.97662911768462,
      },
    ];
    assert.deepEqual(result, expected);
  });
});
