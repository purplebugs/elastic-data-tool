import { describe, it } from "node:test";
import { strict as assert } from "node:assert";
import { colorTransformer } from "../../functions/colorTransformer.js";

describe("Color transformer", async () => {
  it("should transform color properties to one color object with original and pretty names", async () => {
    // TODO colours in all
    // TODO test will all null
    // TODO test with some null, missing

    // ARRANGE
    const object = {
      color1: "COLOR_LIGHT_FAWN",
      color2: null,
      color3: null,
      colorSolid: null,
    };

    // ACT
    const actual = colorTransformer(object);

    // ASSERT
    const expected = {
      color: {
        color1: { original: "COLOR_LIGHT_FAWN" },
        color2: { original: null },
        color3: { original: null },
        colorSolid: { original: null },
      },
    };

    assert.deepEqual(actual, expected);
  });
});
