import { describe, it } from "node:test";
import { strict as assert } from "node:assert";
import { isEmptyObject } from "../../functions/isEmptyObject.js";

describe("isEmptyObject", async () => {
  it("should return true if object is empty", async () => {
    // ARRANGE
    const obj = {};

    // ACT
    const actual = isEmptyObject(obj);
    const expected = true;

    // ASSERT
    assert.equal(actual, expected);
  });

  it("should return false if object is NOT empty", async () => {
    // ARRANGE
    const obj = { name: "Chanel" };

    // ACT
    const actual = isEmptyObject(obj);
    const expected = false;

    // ASSERT
    assert.equal(actual, expected);
  });
});
