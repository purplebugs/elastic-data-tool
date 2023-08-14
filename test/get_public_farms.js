import { describe, it } from "node:test";
import { strict as assert } from "node:assert";
import { transformerBulkSyntax } from "../get_public_farms.js";

describe("Get public farms", async () => {
  it("should transform public farms with elasticsearch _bulk syntax", async () => {
    // ARRANGE
    const publicFarmArray = [
      { keeper: 1234, name: "Alpakkahagen" },
      { keeper: 5678, name: "Another public farm" },
    ];

    // ACT
    const result = await transformerBulkSyntax(publicFarmArray);

    console.log("result", result);
    // ASSERT

    assert.equal(
      result,
      `{"index":{"_id":1}}\n{"keeper":1234,"name":"Alpakkahagen","public":true}\n{"index":{"_id":2}}\n{"keeper":5678,"name":"Another public farm","public":true}`
    );
  });
});
