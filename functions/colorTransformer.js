const colorPretty = (color) => {
  let pretty = color;

  switch (color) {
    case "COLOR_WHITE":
      pretty = "White";
      break;
    case "COLOR_TRUE_BLACK":
      pretty = "True black";
      break;
    case "COLOR_MEDIUM_FAWN":
      pretty = "Medium fawn";
      break;
    case "COLOR_MEDIUM_BROWN":
      pretty = "Medium brown";
      break;
    case "COLOR_LIGHT_FAWN":
      pretty = "Light fawn";
      break;
    case "COLOR_BEIGE":
      pretty = "Beige";
      break;
    case "COLOR_DARK_BROWN":
      pretty = "Dark brown";
      break;
    case "COLOR_LIGHT_BROWN":
      pretty = "Light brown";
      break;
    case "COLOR_DARK_FAWN":
      pretty = "Dark fawn";
      break;
    case "COLOR_MEDIUM_SILVER_GREY":
      pretty = "Medium silver grey";
      break;
    case "COLOR_MEDIUM_ROSE_GREY":
      pretty = "Medium rose grey";
      break;
    case "COLOR_BAY_BLACK":
      pretty = "Bay black";
      break;
    case "COLOR_DARK_SILVER_GREY":
      pretty = "Dark silver grey";
      break;
    case "COLOR_MULTI":
      pretty = "Multi";
      break;
    case "COLOR_DARK_ROSE_GREY":
      pretty = "Dark rose grey";
      break;
    case "COLOR_LIGHT_ROSE_GREY":
      pretty = "Light rose grey";
      break;
    case "COLOR_LIGHT_SILVER_GREY":
      pretty = "Light silver grey";
      break;
    case "COLOR_ROAN":
      pretty = "Roan";
      break;
    case "COLOR_NA":
      pretty = "Not applicable";
      break;
    default:
      if (color !== null) {
        console.log(`[LOG] No color matched: ${color}`);
      }
  }

  return pretty;
};

export const colorTransformer = ({ color1 = null, color2 = null, color3 = null, colorSolid = null } = {}) => {
  if (color1 === null && color2 === null && color3 === null && colorSolid === null) {
    return null;
  }

  try {
    return {
      color: {
        color1: { pretty: colorPretty(color1), original: color1 },
        color2: { pretty: colorPretty(color2), original: color2 },
        color3: { pretty: colorPretty(color3), original: color3 },
        colorSolid: { pretty: colorPretty(colorSolid), original: colorSolid },
      },
    };
  } catch (error) {
    console.error(error);
    throw new Error("🧨 colorTransformer: Could not transform");
  }
};
