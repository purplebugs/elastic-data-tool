import { describe, it } from "node:test";
import { strict as assert } from "node:assert";
import { capitaliseFirstLetter } from "../../functions/capitaliseFirstLetter.js";

describe("capitaliseFirstLetter", async () => {
  it("should transform all uppercase word with first letter only as capital", async () => {
    // ARRANGE
    const city = "     mY CITY   naME  ";
    const expected = "My City Name";

    // ACT
    const actual = capitaliseFirstLetter(city);

    // ASSERT
    assert.equal(actual, expected);
  });
});
