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
    const result = await fileTransformer(alpacaDetailsArray, { bulkSyntax: false }, { geoDecodeEnrich: false });

    // ASSERT
    assert.equal(
      result[0],
      JSON.stringify({
        alpacaId: 1234,
        keeperName: "Not a public farm name",
        public: false,
      })
    );
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
    const result = await fileTransformer(alpacaDetailsArray, { bulkSyntax: false }, { geoDecodeEnrich: false });

    // ASSERT
    assert.equal(
      result[0],
      JSON.stringify({
        alpacaId: 1234,
        keeperName: "Alpakkahagen",
        public: true,
      })
    );
  });

  it("should format with elasticsearch bulkSyntax if `bulkSyntax: true`", async () => {
    // ARRANGE
    const alpacaDetailsArray = [
      {
        alpacaId: 1234,
        keeperName: "Not a public farm name",
      },
    ];

    // ACT
    const result = await fileTransformer(alpacaDetailsArray, { bulkSyntax: true }, { geoDecodeEnrich: false });

    // ASSERT
    assert.deepEqual(result, [
      { create: {} },
      {
        alpacaId: 1234,
        keeperName: "Not a public farm name",
        public: false,
      },
    ]);
  });
});
