import { describe, it } from "node:test";
import { strict as assert } from "node:assert";
import { publicFarmBulkSyntax } from "../../functions/publicFarmBulkSyntax.js";

describe("Get public farms", async () => {
  it("should transform public farms with elasticsearch _bulk syntax", async () => {
    // ARRANGE
    const publicFarmArray = [
      { keeper: 1234, name: "Alpakkahagen" },
      { keeper: 5678, name: "Another public farm" },
    ];

    // ACT
    const result = await publicFarmBulkSyntax(publicFarmArray);

    // ASSERT

    const expected = `{"index":{"_id":1}}
{"keeper":1234,"name":"Alpakkahagen","public":true}
{"index":{"_id":2}}
{"keeper":5678,"name":"Another public farm","public":true}`;

    assert.equal(result, expected);
  });
});
