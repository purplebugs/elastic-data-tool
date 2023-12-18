const colorPretty = (color) => {
  let color_pretty = color;

  switch (color) {
    case "COLOR_WHITE":
      color_pretty = "White";
      break;
    case "COLOR_TRUE_BLACK":
      color_pretty = "True black";
      break;
    case "COLOR_MEDIUM_FAWN":
      color_pretty = "Medium fawn";
      break;
    case "COLOR_MEDIUM_BROWN":
      color_pretty = "Medium brown";
      break;
    case "COLOR_LIGHT_FAWN":
      color_pretty = "Light fawn";
      break;
    case "COLOR_BEIGE":
      color_pretty = "Beige";
      break;
    case "COLOR_DARK_BROWN":
      color_pretty = "Dark brown";
      break;
    case "COLOR_LIGHT_BROWN":
      color_pretty = "Light brown";
      break;
    case "COLOR_DARK_FAWN":
      color_pretty = "Dark fawn";
      break;
    case "COLOR_MEDIUM_SILVER_GREY":
      color_pretty = "Medium silver grey";
      break;
    case "COLOR_MEDIUM_ROSE_GREY":
      color_pretty = "Medium rose grey";
      break;
    case "COLOR_BAY_BLACK":
      color_pretty = "Bay black";
      break;
    case "COLOR_DARK_SILVER_GREY":
      color_pretty = "Dark silver grey";
      break;
    case "COLOR_MULTI":
      color_pretty = "Multi";
      break;
    case "COLOR_DARK_ROSE_GREY":
      color_pretty = "Dark rose grey";
      break;
    case "COLOR_LIGHT_ROSE_GREY":
      color_pretty = "Light rose grey";
      break;
    case "COLOR_LIGHT_SILVER_GREY":
      color_pretty = "Light silver grey";
      break;
    default:
      console.log(`[LOG] No color matched: ${color_pretty}`);
  }

  return color_pretty;
};

export const colorTransformer = ({ color1 = null, color2 = null, color3 = null, colorSolid = null } = {}) => {
  if (color1 === null && color2 === null && color3 === null && colorSolid === null) {
    return null;
  }

  try {
    return {
      color: {
        color1: { color_pretty: colorPretty(color1), original: color1 },
        color2: { color_pretty: colorPretty(color2), original: color2 },
        color3: { color_pretty: colorPretty(color3), original: color3 },
        colorSolid: { color_pretty: colorPretty(colorSolid), original: colorSolid },
      },
    };
  } catch (error) {
    console.error(error);
    throw new Error("🧨 colorTransformer: Could not transform");
  }
};
