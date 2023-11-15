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
        location: {
          type: "Point",
          coordinates: [null, null],
        },
        public: false,
        private: true,
      },
      {
        alpacaId: 456,
        city: null,
        companyId: 111,
        keeperName: "Farm one",
        location: { type: "Point", coordinates: [null, null] },
        public: false,
        private: true,
      },
      {
        alpacaId: 789,
        city: "Fredrikstad",
        companyId: 222,
        keeperName: "Farm two",
        location: {
          type: "Point",
          coordinates: [10.97662911768462, 59.295708720373376],
          google: {
            formatted_address: "Anita street, 1234 Oslo, Norway",
            place_id: "some-random-id",
          },
        },
        public: true,
        private: false,
      },
    ];

    // ACT
    const result = farmsFromAlpacas(alpacaDetailsArray, { publicFarmsOnly: false });

    // ASSERT

    const expected = [
      {
        id: 111,
        city: null,
        countOfAlpacas: 2,
        lat: null,
        lng: null,
        location: {
          coordinates: [null, null],
          type: "Point",
        },
        name: "Farm one",
        public: false,
        private: true,
      },
      {
        id: 222,
        city: "Fredrikstad",
        countOfAlpacas: 1,
        lat: 59.295708720373376,
        lng: 10.97662911768462,
        location: {
          coordinates: [10.97662911768462, 59.295708720373376],
          type: "Point",
          google: {
            formatted_address: "Anita street, 1234 Oslo, Norway",
            place_id: "some-random-id",
          },
        },
        name: "Farm two",
        public: true,
        private: false,
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("should transform list of alpacas to list of PUBLIC farms with alpaca count if `{ publicFarmsOnly : true }`", async () => {
    // ARRANGE
    const alpacaDetailsArray = [
      {
        alpacaId: 123,
        city: null,
        companyId: 111,
        keeperName: "Farm one",
        location: { type: "Point", coordinates: [null, null] },
        public: false,
        private: true,
      },
      {
        alpacaId: 456,
        city: null,
        companyId: 111,
        keeperName: "Farm one",
        location: { type: "Point", coordinates: [null, null] },
        public: false,
        private: true,
      },
      {
        alpacaId: 789,
        city: "Fredrikstad",
        companyId: 222,
        keeperName: "Farm two",
        location: {
          type: "Point",
          coordinates: [10.97662911768462, 59.295708720373376],
        },
        public: true,
        private: false,
      },
    ];

    // ACT
    const result = farmsFromAlpacas(alpacaDetailsArray, { publicFarmsOnly: true });

    // ASSERT

    const expected = [
      {
        id: 222,
        city: "Fredrikstad",
        countOfAlpacas: 1,
        lat: 59.295708720373376,
        lng: 10.97662911768462,
        location: {
          coordinates: [10.97662911768462, 59.295708720373376],
          type: "Point",
        },
        name: "Farm two",
        public: true,
        private: false,
      },
    ];
    assert.deepEqual(result, expected);
  });
});
