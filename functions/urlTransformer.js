export const toNodeURL = (webpageRaw) => {
  try {
    let webpage = undefined;
    let myURL = undefined;

    if (webpageRaw === null || webpageRaw === undefined) {
      return null;
    }

    webpage = webpageRaw.trim();

    if (webpage.startsWith("http://") || webpage.startsWith("https://")) {
      myURL = new URL(webpage);
    }

    if (myURL === undefined) {
      myURL = new URL(`http://${webpage}`);
    }

    return myURL;
  } catch (error) {
    console.error(error);
    throw new Error("🧨 toNodeURL: Could not transform url");
  }
};

export const toElasticCommonSchemaURL = (nodeURL, webpageRaw) => {
  try {
    if (nodeURL === null || nodeURL === undefined) {
      return null;
    }

    const full = nodeURL?.href.endsWith("/") ? nodeURL?.href.slice(0, -1) : nodeURL?.href; // Remove final "/"

    const prettyPath =
      nodeURL?.pathname !== "/" && nodeURL?.pathname.endsWith("/") ? nodeURL?.pathname.slice(0, -1) : nodeURL?.pathname; // Remove final "/"

    const pretty = prettyPath !== "/" ? nodeURL?.host + prettyPath : nodeURL?.host; // Append path if not "/"

    return {
      url: {
        original: webpageRaw,
        domain: nodeURL.host,
        full: full,
        path: prettyPath,
        pretty: pretty, // This is custom, not part of Elastic Common Schema, used to show clean url on website
        scheme: nodeURL.protocol.split(":")[0],
      },
    };
  } catch (error) {
    console.error(error);
    throw new Error("🧨 toElasticCommonSchemaURL: Could not transform url");
  }
};

export const urlTransformer = (webpageRaw) => {
  try {
    if (webpageRaw === null || webpageRaw === undefined) {
      return null;
    }

    const nodeURL = toNodeURL(webpageRaw);
    return toElasticCommonSchemaURL(nodeURL, webpageRaw);
  } catch (error) {
    console.error(error);
    throw new Error("🧨 urlTransformer: Could not transform url");
  }
};

export const toGoogleDirectionsURL = (formatted_address) => {
  // Ref: https://developers.google.com/maps/documentation/urls/get-started#directions-action

  try {
    let myURL = undefined;

    if (formatted_address === null || formatted_address === undefined) {
      return null;
    }

    myURL = new URL(`https://www.google.com/maps/dir/?api=1&origin=&destination=${formatted_address}`);

    return myURL;
  } catch (error) {
    console.error(error);
    throw new Error("🧨 toGoogleDirectionsURL: Could not generate url");
  }
};
