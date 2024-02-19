import { describe, it } from "node:test";
import { strict as assert } from "node:assert";
import fileTransformer from "../../functions/fileTransformer.js";

describe("Farm info transformer", async () => {
  it("should NOT set as public farm if farm NOT in list of public farms", async () => {
    // ARRANGE
    const alpacaDetailsArray = [
      {
        alpacaId: 1234,
        keeperName: "Not a public farm name",
      },
    ];

    // ACT
    const result = await fileTransformer(alpacaDetailsArray, { geoDecodeEnrich: false });

    // ASSERT
    assert.deepEqual(result[0], {
      alpacaId: 1234,
      keeperName: "Not a public farm name",
      private: true,
      public: false,
      type: "alpaca",
    });
  });

  it("should set as public farm if farm IS in list of public farms", async () => {
    // ARRANGE
    const alpacaDetailsArray = [
      {
        alpacaId: 1234,
        keeperName: "Alpakkahagen",
      },
    ];

    // ACT
    const result = await fileTransformer(alpacaDetailsArray, { geoDecodeEnrich: false });

    // ASSERT
    assert.deepEqual(result[0], {
      alpacaId: 1234,
      keeperName: "Alpakkahagen",
      private: false,
      public: true,
      type: "alpaca",
    });
  });

  it("should add Elastic Common Schema URL object if webpage is not null", async () => {
    // ARRANGE
    const alpacaDetailsArray = [
      {
        alpacaId: 1234,
        keeperName: "Not a public farm name",
        webpage: "http://www.mysite.com",
      },
    ];

    // ACT
    const result = await fileTransformer(alpacaDetailsArray, { geoDecodeEnrich: false });

    // ASSERT
    assert.deepEqual(result[0], {
      alpacaId: 1234,
      keeperName: "Not a public farm name",
      private: true,
      public: false,
      type: "alpaca",
      url: {
        domain: "www.mysite.com",
        full: "http://www.mysite.com",
        original: "http://www.mysite.com",
        path: "/",
        pretty: "www.mysite.com",
        scheme: "http",
      },
      webpage: "http://www.mysite.com",
    });
  });

  it(`should set animal as type: "alpaca" if NOT specified`, async () => {
    // ARRANGE
    const alpacaDetailsArray = [
      {
        alpacaId: 1234,
        keeperName: "Alpakkahagen",
      },
    ];

    // ACT
    const result = await fileTransformer(alpacaDetailsArray, { geoDecodeEnrich: false });

    // ASSERT
    assert.deepEqual(result[0], {
      alpacaId: 1234,
      keeperName: "Alpakkahagen",
      private: false,
      public: true,
      type: "alpaca",
    });
  });

  it(`should set animal as type: "alpaca" if IS specified`, async () => {
    // ARRANGE
    const alpacaDetailsArray = [
      {
        alpacaId: 1234,
        keeperName: "Alpakkahagen",
      },
    ];

    // ACT
    const result = await fileTransformer(alpacaDetailsArray, { geoDecodeEnrich: false, animal: "alpaca" });

    // ASSERT
    assert.deepEqual(result[0], {
      alpacaId: 1234,
      keeperName: "Alpakkahagen",
      private: false,
      public: true,
      type: "alpaca",
    });
  });

  it(`should set animal type to some other animal if IS specified`, async () => {
    // ARRANGE
    const alpacaDetailsArray = [
      {
        alpacaId: 1234,
        keeperName: "Alpakkahagen",
      },
    ];

    // ACT
    const result = await fileTransformer(alpacaDetailsArray, { geoDecodeEnrich: false, animal: "goat" });

    // ASSERT
    assert.deepEqual(result[0], {
      alpacaId: 1234,
      keeperName: "Alpakkahagen",
      private: false,
      public: true,
      type: "goat",
    });
  });

  it("should transform color properties to object and remove original properties", async () => {
    // ARRANGE
    const alpacaDetailsArray = [
      {
        alpacaId: 1234,
        keeperName: "Alpakkahagen",
        color1: "COLOR_LIGHT_FAWN",
        color2: "COLOR_WHITE",
        color3: "COLOR_MEDIUM_FAWN",
        colorSolid: "COLOR_BAY_BLACK",
      },
    ];

    // ACT
    const result = await fileTransformer(alpacaDetailsArray);

    // ASSERT
    const expected = {
      alpacaId: 1234,
      keeperName: "Alpakkahagen",
      private: false,
      public: true,
      type: "alpaca",
      color: {
        color1: { pretty: "Light fawn", original: "COLOR_LIGHT_FAWN" },
        color2: { pretty: "White", original: "COLOR_WHITE" },
        color3: { pretty: "Medium fawn", original: "COLOR_MEDIUM_FAWN" },
        colorSolid: { pretty: "Bay black", original: "COLOR_BAY_BLACK" },
      },
    };

    assert.deepEqual(result[0], expected);
  });

  it("should transform date of birth and date of death to contain original and pretty dates", async () => {
    // ARRANGE
    const alpacaDetailsArray = [
      {
        alpacaId: 1234,
        keeperName: "Alpakkahagen",
        DOB: "2009-02-09T23:00:00.000Z",
        DOD: "2018-06-10T22:00:00.000Z",
      },
    ];

    // ACT
    const result = await fileTransformer(alpacaDetailsArray);

    // ASSERT
    const expected = {
      alpacaId: 1234,
      keeperName: "Alpakkahagen",
      private: false,
      public: true,
      type: "alpaca",
      DOB: { pretty: "09 February 2009", original: "2009-02-09T23:00:00.000Z" },
      DOD: { pretty: "10 June 2018", original: "2018-06-10T22:00:00.000Z" },
    };

    assert.deepEqual(result[0], expected);
  });
});
