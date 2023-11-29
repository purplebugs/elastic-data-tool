export const toNodeURL = (webpageRaw) => {
  let webpage = undefined;
  let myURL = undefined;

  if (webpageRaw == null || webpageRaw == undefined) {
    return null;
  }

  webpage = webpageRaw.trim();

  if (webpage.startsWith("http://") || webpage.startsWith("https://")) {
    myURL = new URL(webpage);
  }

  if (myURL === undefined) {
    myURL = new URL(`https://${webpage}`);
  }

  return myURL;
};

export const urlTransformer = (webpageRaw) => {
  try {
    return toNodeURL(webpageRaw);
  } catch (error) {
    console.error(error);
    throw new Error("🧨 urlTransformer: Could not transform url");
  }
};
