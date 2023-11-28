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
        full: "http://www.mysite.com/",
        original: "http://www.mysite.com",
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
});
