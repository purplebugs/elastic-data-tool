import { describe, it } from "node:test";
import { strict as assert } from "node:assert";
import { farmsFromAlpacas } from "../../functions/farmsFromAlpacas.js";

describe("Farms from alpacas transformer", async () => {
  it("should transform list of alpacas to list of ALL farms with alpaca count if `{ publicFarmsOnly : false }`", async () => {
    // ARRANGE
    const alpacaDetailsArray = [
      {
        alpacaId: 123,
        city: null,
        companyId: 111,
        keeperName: "Farm one",
        location: { type: "Point", coordinates: [null, null], kommunenummer: null, kommunenavn: null },
      },
      {
        alpacaId: 456,
        city: null,
        companyId: 111,
        keeperName: "Farm one",
        location: { type: "Point", coordinates: [null, null], kommunenummer: null, kommunenavn: null },
      },
      {
        alpacaId: 789,
        city: "Fredrikstad",
        companyId: 222,
        keeperName: "Farm two",
        location: {
          type: "Point",
          coordinates: [10.97662911768462, 59.295708720373376],
          kommunenummer: "3004",
          kommunenavn: "FREDRIKSTAD",
        },
        public: true,
      },
    ];

    // ACT
    const result = farmsFromAlpacas(alpacaDetailsArray, { publicFarmsOnly: false });

    // ASSERT

    const expected = [
      { id: 111, city: null, countOfAlpacas: 2, lat: null, lng: null, name: "Farm one", public: false },
      {
        id: 222,
        city: "Fredrikstad",
        countOfAlpacas: 1,
        lat: 59.295708720373376,
        lng: 10.97662911768462,
        name: "Farm two",
        public: true,
      },
    ];
    assert.deepEqual(result, expected);
  });
});
