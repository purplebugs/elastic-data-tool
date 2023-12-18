import { describe, it } from "node:test";
import { strict as assert } from "node:assert";
import { colorTransformer } from "../../functions/colorTransformer.js";

describe("Color transformer", async () => {
  it("should transform color properties to null - all null or missing", async () => {
    // ARRANGE
    const object = {
      color1: null,
      color2: null,
      colorSolid: null,
    };

    // ACT
    const actual = colorTransformer(object);

    // ASSERT
    const expected = null;

    assert.deepEqual(actual, expected);
  });

  it("should transform color properties to one color object with null properties - some null or missing", async () => {
    // ARRANGE
    const object = {
      color1: "COLOR_LIGHT_FAWN",
      color3: null,
      colorSolid: "COLOR_BAY_BLACK",
    };

    // ACT
    const actual = colorTransformer(object);

    // ASSERT
    const expected = {
      color: {
        color1: { color_pretty: "Light fawn", original: "COLOR_LIGHT_FAWN" },
        color2: { color_pretty: null, original: null },
        color3: { color_pretty: null, original: null },
        colorSolid: { color_pretty: "Bay black", original: "COLOR_BAY_BLACK" },
      },
    };

    assert.deepEqual(actual, expected);
  });

  it("should transform color properties to one color object with original and pretty names - all values", async () => {
    // ARRANGE
    const object = {
      color1: "COLOR_LIGHT_FAWN",
      color2: "COLOR_WHITE",
      color3: "COLOR_MEDIUM_FAWN",
      colorSolid: "COLOR_BAY_BLACK",
    };

    // ACT
    const actual = colorTransformer(object);

    // ASSERT
    const expected = {
      color: {
        color1: { color_pretty: "Light fawn", original: "COLOR_LIGHT_FAWN" },
        color2: { color_pretty: "White", original: "COLOR_WHITE" },
        color3: { color_pretty: "Medium fawn", original: "COLOR_MEDIUM_FAWN" },
        colorSolid: { color_pretty: "Bay black", original: "COLOR_BAY_BLACK" },
      },
    };

    assert.deepEqual(actual, expected);
  });
});
