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
    });
  });

  it(`should NOT set animal as type: "alpaca" if NOT specified`, async () => {
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
    const result = await fileTransformer(alpacaDetailsArray, { geoDecodeEnrich: false }, { animal: "alpaca" });

    // ASSERT
    assert.deepEqual(result[0], {
      alpacaId: 1234,
      keeperName: "Alpakkahagen",
      private: false,
      public: true,
    });
  });
});
