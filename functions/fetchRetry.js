import fetch from "node-fetch";

export default async function fetchRetry(url, options = {}, retries) {
  try {
    const response = await fetch(url, options);
    return response;
  } catch (error) {
    if (retries > 0) {
      return fetchRetry(url, options, retries - 1);
    }

    console.error(error);
    throw new Error("fetchRetry: Could not fetch url");
  }
}
