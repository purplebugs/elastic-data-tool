export const colorTransformer = ({ color1 = null, color2 = null, color3 = null, colorSolid = null } = {}) => {
  if (color1 === null && color2 === null && color3 === null && colorSolid === null) {
    return null;
  }

  try {
    // TODO add pretty properties
    return {
      color: {
        color1: {
          original: color1,
        },
        color2: {
          original: color2,
        },
        color3: {
          original: color3,
        },
        colorSolid: {
          original: colorSolid,
        },
      },
    };
  } catch (error) {
    console.error(error);
    throw new Error("🧨 colorTransformer: Could not transform");
  }
};
