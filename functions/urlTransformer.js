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

    const path = nodeURL?.pathname !== "/" ? nodeURL?.pathname : ""; // Only use if there is a string of letters, do not use if is default value "/"
    const prettyPath = path.endsWith("/") ? path.slice(0, -1) : path; // Remove final "/"

    return {
      url: {
        original: webpageRaw,
        domain: nodeURL.host,
        full: nodeURL.href,
        path: nodeURL.pathname,
        pretty: nodeURL?.host + prettyPath, // This is custom, not part of Elastic Common Schema, used to show clean url on website
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
