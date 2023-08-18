import { describe, it } from "node:test";
import { strict as assert } from "node:assert";
import bulkSyntax from "../../functions/elasticsearch_commands/bulkSyntax.js";

describe("Elasticsearch _bulk syntax transformer", async () => {
  it("should format list with elasticsearch bulkSyntax()", async () => {
    // ARRANGE
    const items = [
      {
        id: 1,
        name: "Name one",
      },
      {
        id: 2,
        name: "Name two",
      },
    ];

    // ACT
    const result = bulkSyntax(items);

    // ASSERT
    assert.deepEqual(result, [
      { create: {} },
      {
        id: 1,
        name: "Name one",
      },
      { create: {} },
      {
        id: 2,
        name: "Name two",
      },
    ]);
  });
});
