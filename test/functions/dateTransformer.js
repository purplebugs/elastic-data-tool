import { describe, it } from "node:test";
import { strict as assert } from "node:assert";
import { dateTransformer } from "../../functions/dateTransformer.js";

describe("Date transformer", async () => {
  it("should transform date to null - if null or missing date", async () => {
    // ARRANGE
    const date = null;

    // ACT
    const actual = dateTransformer(date, "DOB");

    // ASSERT
    const expected = null;

    assert.deepEqual(actual, expected);
  });

  it("should transform date to null - if null or missing label", async () => {
    // ARRANGE

    // ACT
    const actual = dateTransformer("2013-06-20T22:00:00.000Z");

    // ASSERT
    const expected = null;

    assert.deepEqual(actual, expected);
  });

  it("should transform date to contain original and pretty date", async () => {
    // ARRANGE
    const date = "2013-06-20T22:00:00.000Z";

    // ACT
    const actual = dateTransformer(date, "DOB");

    // ASSERT
    const expected = {
      DOB: {
        original: "2013-06-20T22:00:00.000Z",
        pretty: "21 Jun 2013",
      },
    };

    assert.deepEqual(actual, expected);
  });
});
