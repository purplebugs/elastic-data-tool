import { describe, it } from "node:test";
import { strict as assert } from "node:assert";
import { farmsFromAlpacas } from "../../functions/farmsFromAlpacas.js";

describe("Farms from alpacas transformer", async () => {
  it("should transform farm with FARM_CATEGORY category object if companyId is in FARM_CATEGORY list", async () => {
    // ARRANGE
    const alpacaDetailsArray = [
      {
        alpacaId: 123,
        city: null,
        companyId: 61,
        email: undefined,
        keeperName: "Farm one",
        descriptionCompany: undefined,
        location: {
          coordinates: [null, null],
          geo_json: {
            type: "Point",
            coordinates: [null, null],
          },
        },
        phone: undefined,
        public: false,
        status: "STATUS_ACTIVE",
        private: true,
        webpage: null,
      },
    ];

    // ACT
    const result = farmsFromAlpacas(alpacaDetailsArray, { publicFarmsOnly: false });

    // ASSERT

    const expected = [
      {
        id: 61,
        category: {
          alpacaSales: true,
          alpacaWalking: true,
          bookable: true,
          shop: true,
          overnightStay: false,
          private: false,
          public: true,
          studServices: true,
        },
        city: null,
        count: {
          alpacas: {
            status: {
              active: 1,
              dead: 0,
              export: 0,
            },
            total: 1,
          },
        },
        descriptionCompany: undefined,
        email: undefined,
        lat: null,
        lng: null,
        location: {
          coordinates: [null, null],
          geo_json: {
            type: "Point",
            coordinates: [null, null],
          },
        },
        name: "Farm one",
        phone: undefined,
        public: false,
        private: true,
        url: null,
        webpage: null,
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("should transform farm with DEFAULT category object if companyId is NOT in FARM_CATEGORY list", async () => {
    // ARRANGE
    const alpacaDetailsArray = [
      {
        alpacaId: 123,
        city: null,
        companyId: 1,
        email: undefined,
        keeperName: "Farm one",
        descriptionCompany: undefined,
        location: {
          coordinates: [null, null],
          geo_json: {
            type: "Point",
            coordinates: [null, null],
          },
        },
        phone: undefined,
        public: false,
        status: "STATUS_ACTIVE",
        private: true,
        webpage: null,
      },
    ];

    // ACT
    const result = farmsFromAlpacas(alpacaDetailsArray, { publicFarmsOnly: false });

    // ASSERT

    const expected = [
      {
        id: 1,
        category: {
          alpacaSales: false,
          alpacaWalking: false,
          bookable: false,
          shop: false,
          overnightStay: false,
          private: true,
          public: false,
          studServices: false,
        },
        city: null,
        count: {
          alpacas: {
            status: {
              active: 1,
              dead: 0,
              export: 0,
            },
            total: 1,
          },
        },
        descriptionCompany: undefined,
        email: undefined,
        lat: null,
        lng: null,
        location: {
          coordinates: [null, null],
          geo_json: {
            type: "Point",
            coordinates: [null, null],
          },
        },
        name: "Farm one",
        phone: undefined,
        public: false,
        private: true,
        url: null,
        webpage: null,
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("should transform list of alpacas to list of ALL farms with alpaca count if `{ publicFarmsOnly : false }`", async () => {
    // ARRANGE
    const alpacaDetailsArray = [
      {
        alpacaId: 123,
        city: null,
        companyId: 111,
        email: undefined,
        keeperName: "Farm one",
        descriptionCompany: undefined,
        location: {
          coordinates: [null, null],
          geo_json: {
            type: "Point",
            coordinates: [null, null],
          },
        },
        phone: undefined,
        public: false,
        status: "STATUS_ACTIVE",
        private: true,
        webpage: null,
      },
      {
        alpacaId: 456,
        city: null,
        companyId: 111,
        email: undefined,
        descriptionCompany: undefined,
        keeperName: "Farm one",
        location: {
          coordinates: [null, null],
          geo_json: {
            type: "Point",
            coordinates: [null, null],
          },
        },
        phone: undefined,
        public: false,
        private: true,
        status: "STATUS_ACTIVE",
        webpage: null,
      },
      {
        alpacaId: 789,
        city: null,
        companyId: 111,
        email: undefined,
        descriptionCompany: undefined,
        keeperName: "Farm one",
        location: {
          coordinates: [null, null],
          geo_json: {
            type: "Point",
            coordinates: [null, null],
          },
        },
        phone: undefined,
        public: false,
        private: true,
        status: "STATUS_DEAD",
        webpage: null,
      },
      {
        alpacaId: 888,
        city: "Fredrikstad",
        companyId: 222,
        descriptionCompany: "More info about Farm two",
        email: "Email@farm.com",
        keeperName: "Farm two",
        location: {
          coordinates: [10.97662911768462, 59.295708720373376],
          geo_json: {
            type: "Point",
            coordinates: [10.97662911768462, 59.295708720373376],
          },
          google: {
            formatted_address: "Anita street, 1234 Oslo, Norway",
            place_id: "some-random-id",
          },
        },
        phone: "phone 123",
        public: true,
        private: false,
        webpage: null,
      },
    ];

    // ACT
    const result = farmsFromAlpacas(alpacaDetailsArray, { publicFarmsOnly: false });

    // ASSERT

    const expected = [
      {
        id: 111,
        category: {
          alpacaSales: false,
          alpacaWalking: false,
          bookable: false,
          shop: false,
          overnightStay: false,
          private: true,
          public: false,
          studServices: false,
        },
        city: null,
        count: {
          alpacas: {
            status: {
              active: 2,
              dead: 1,
              export: 0,
            },
            total: 3,
          },
        },
        descriptionCompany: undefined,
        email: undefined,
        lat: null,
        lng: null,
        location: {
          coordinates: [null, null],
          geo_json: {
            type: "Point",
            coordinates: [null, null],
          },
        },
        name: "Farm one",
        phone: undefined,
        public: false,
        private: true,
        url: null,
        webpage: null,
      },
      {
        id: 222,
        category: {
          alpacaSales: false,
          alpacaWalking: false,
          bookable: false,
          shop: false,
          overnightStay: false,
          private: true,
          public: false,
          studServices: false,
        },
        city: "Fredrikstad",
        count: {
          alpacas: {
            status: {
              active: 0,
              dead: 0,
              export: 0,
            },
            total: 1,
          },
        },
        descriptionCompany: "More info about Farm two",
        email: "Email@farm.com",
        lat: 59.295708720373376,
        lng: 10.97662911768462,
        location: {
          coordinates: [10.97662911768462, 59.295708720373376],
          geo_json: {
            type: "Point",
            coordinates: [10.97662911768462, 59.295708720373376],
          },
          google: {
            formatted_address: "Anita street, 1234 Oslo, Norway",
            place_id: "some-random-id",
          },
        },
        name: "Farm two",
        phone: "phone 123",
        public: true,
        private: false,
        url: null,
        webpage: null,
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
        email: undefined,
        keeperName: "Farm one",
        location: {
          geo_json: {
            type: "Point",
            coordinates: [10.97662911768462, 59.295708720373376],
          },
          coordinates: [10.97662911768462, 59.295708720373376],
        },
        phone: undefined,
        public: false,
        private: true,
        webpage: null,
      },
      {
        alpacaId: 456,
        city: null,
        companyId: 111,
        email: undefined,
        keeperName: "Farm one",
        location: { type: "Point", coordinates: [null, null] },
        phone: undefined,
        public: false,
        private: true,
        webpage: null,
      },
      {
        alpacaId: 789,
        city: "Fredrikstad",
        email: undefined,
        companyId: 222,
        descriptionCompany: "More info about Farm two",
        keeperName: "Farm two",
        location: {
          geo_json: {
            type: "Point",
            coordinates: [10.97662911768462, 59.295708720373376],
          },
          coordinates: [10.97662911768462, 59.295708720373376],
        },
        phone: undefined,
        public: true,
        private: false,
        webpage: null,
      },
    ];

    // ACT
    const result = farmsFromAlpacas(alpacaDetailsArray, { publicFarmsOnly: true });

    // ASSERT

    const expected = [
      {
        id: 222,
        category: {
          alpacaSales: false,
          alpacaWalking: false,
          bookable: false,
          shop: false,
          overnightStay: false,
          private: true,
          public: false,
          studServices: false,
        },
        city: "Fredrikstad",
        count: {
          alpacas: {
            status: {
              active: 0,
              dead: 0,
              export: 0,
            },
            total: 1,
          },
        },
        email: undefined,
        descriptionCompany: "More info about Farm two",
        lat: 59.295708720373376,
        lng: 10.97662911768462,
        location: {
          coordinates: [10.97662911768462, 59.295708720373376],
          geo_json: {
            type: "Point",
            coordinates: [10.97662911768462, 59.295708720373376],
          },
        },
        name: "Farm two",
        phone: undefined,
        public: true,
        private: false,
        url: null,
        webpage: null,
      },
    ];
    assert.deepEqual(result, expected);
  });

  it("should transform list of alpacas to list of farms with alpaca list if `{ publicFarmsOnly : false , includeAlpacas: true }`", async () => {
    // ARRANGE
    const alpacaDetailsArray = [
      {
        alpacaId: 123,
        city: null,
        companyId: 111,
        email: undefined,
        keeperName: "Farm one",
        descriptionCompany: undefined,
        location: {
          coordinates: [null, null],
          geo_json: {
            type: "Point",
            coordinates: [null, null],
          },
        },
        phone: undefined,
        public: false,
        private: true,
        status: "STATUS_ACTIVE",
        webpage: null,
      },
      {
        alpacaId: 456,
        city: null,
        companyId: 111,
        email: undefined,

        keeperName: "Farm one",
        descriptionCompany: undefined,
        location: {
          coordinates: [null, null],
          geo_json: {
            type: "Point",
            coordinates: [null, null],
          },
        },
        phone: undefined,
        public: false,
        private: true,
        status: "STATUS_ACTIVE",
        webpage: null,
      },
      {
        alpacaId: 789,
        city: "Fredrikstad",
        companyId: 222,
        descriptionCompany: "More info about Farm two",
        email: "Email@farm.com",
        keeperName: "Farm two",
        location: {
          coordinates: [10.97662911768462, 59.295708720373376],
          geo_json: {
            type: "Point",
            coordinates: [10.97662911768462, 59.295708720373376],
          },
          google: {
            formatted_address: "Anita street, 1234 Oslo, Norway",
            place_id: "some-random-id",
          },
        },
        phone: "phone 123",
        public: true,
        private: false,
        status: "STATUS_DEAD",
        webpage: null,
      },
    ];

    // ACT
    const result = farmsFromAlpacas(alpacaDetailsArray, { publicFarmsOnly: false, includeAlpacas: true });

    // ASSERT

    const expected = [
      {
        id: 111,
        category: {
          alpacaSales: false,
          alpacaWalking: false,
          bookable: false,
          shop: false,
          overnightStay: false,
          private: true,
          public: false,
          studServices: false,
        },
        city: null,
        count: {
          alpacas: {
            status: {
              active: 2,
              dead: 0,
              export: 0,
            },
            total: 2,
          },
        },
        descriptionCompany: undefined,
        email: undefined,
        lat: null,
        lng: null,
        location: {
          coordinates: [null, null],
          geo_json: {
            type: "Point",
            coordinates: [null, null],
          },
        },
        name: "Farm one",
        phone: undefined,
        public: false,
        private: true,
        url: null,
        webpage: null,
        alpacas: {
          all: [
            {
              alpacaId: 123,
              city: null,
              companyId: 111,
              keeperName: "Farm one",
              status: "STATUS_ACTIVE",
            },
            {
              alpacaId: 456,
              city: null,
              companyId: 111,
              keeperName: "Farm one",
              status: "STATUS_ACTIVE",
            },
          ],
          status: {
            active: [
              {
                alpacaId: 123,
                city: null,
                companyId: 111,
                keeperName: "Farm one",
                status: "STATUS_ACTIVE",
              },
              {
                alpacaId: 456,
                city: null,
                companyId: 111,
                keeperName: "Farm one",
                status: "STATUS_ACTIVE",
              },
            ],
            dead: [],
            export: [],
          },
        },
      },
      {
        id: 222,
        category: {
          alpacaSales: false,
          alpacaWalking: false,
          bookable: false,
          shop: false,
          overnightStay: false,
          private: true,
          public: false,
          studServices: false,
        },
        city: "Fredrikstad",
        count: {
          alpacas: {
            status: {
              active: 0,
              dead: 1,
              export: 0,
            },
            total: 1,
          },
        },
        descriptionCompany: "More info about Farm two",
        email: "Email@farm.com",
        lat: 59.295708720373376,
        lng: 10.97662911768462,
        location: {
          coordinates: [10.97662911768462, 59.295708720373376],
          geo_json: {
            type: "Point",
            coordinates: [10.97662911768462, 59.295708720373376],
          },
          google: {
            formatted_address: "Anita street, 1234 Oslo, Norway",
            place_id: "some-random-id",
          },
        },
        name: "Farm two",
        phone: "phone 123",
        public: true,
        private: false,
        url: null,
        webpage: null,
        alpacas: {
          all: [
            {
              alpacaId: 789,
              city: "Fredrikstad",
              companyId: 222,
              keeperName: "Farm two",
              status: "STATUS_DEAD",
            },
          ],
          status: {
            active: [],
            dead: [
              {
                alpacaId: 789,
                city: "Fredrikstad",
                companyId: 222,
                keeperName: "Farm two",
                status: "STATUS_DEAD",
              },
            ],
            export: [],
          },
        },
      },
    ];
    assert.deepEqual(result, expected);
  });
});
