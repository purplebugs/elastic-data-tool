import { describe, it } from "node:test";
import { strict as assert } from "node:assert";
import fileTransformer from "../../functions/fileTransformer.js";
import bulkSyntax from "../../functions/elasticsearch_commands/bulkSyntax.js";

describe("Elasticsearch _bulk syntax transformer", async () => {
  it("should format transformed list with elasticsearch bulkSyntax()", async () => {
    // ARRANGE
    const alpacaDetailsArray = [
      {
        alpacaId: 1234,
        keeperName: "Not a public farm name",
      },
    ];

    // ACT
    const result = bulkSyntax(await fileTransformer(alpacaDetailsArray, { geoDecodeEnrich: false }));

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
