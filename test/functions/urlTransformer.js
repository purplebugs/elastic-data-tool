import { describe, it } from "node:test";
import { strict as assert } from "node:assert";
import { urlTransformer } from "../../functions/urlTransformer.js";

describe("urlTransformer", async () => {
  it("should return null if webpage field is null or undefined", async () => {
    // ARRANGE
    const webpage = null;
    const expected = null;

    // ACT
    const actual = urlTransformer(webpage);

    // ASSERT
    assert.equal(actual, expected);
  });

  it(`should return href with trimmed whitespace from start and end`, async () => {
    // ARRANGE
    const webpage = "         http://www.mywebpage.com/hi  ";
    const expected = "http://www.mywebpage.com/hi";

    // ACT
    const actual = urlTransformer(webpage).href;

    // ASSERT
    assert.equal(actual, expected);
  });

  it(`should return href starting with "https://" if original webpage is missing "http:// or "https://" at start`, async () => {
    // ARRANGE
    const webpage = "www.mywebpage.com";
    const expected = "https://www.mywebpage.com/";

    // ACT
    const actual = urlTransformer(webpage).href;

    // ASSERT
    assert.equal(actual, expected);
  });

  it(`should return node URL object with expected properties if webpage starts with http://`, async () => {
    // ARRANGE
    const webpage = "http://www.facebook.com/myFarm/";

    const expected = {
      href: "http://www.facebook.com/myFarm/",
      origin: "http://www.facebook.com",
      protocol: "http:",
      username: "",
      password: "",
      host: "www.facebook.com",
      hostname: "www.facebook.com",
      port: "",
      pathname: "/myFarm/",
      search: "",
      searchParams: {},
      hash: "",
    };

    // ACT
    const actual = urlTransformer(webpage);

    // ASSERT
    assert.equal(actual.webpage, expected.webpage);
    assert.equal(actual.host, expected.host);
    assert.equal(actual.href, expected.href);
    assert.equal(actual.protocol, expected.protocol);
  });

  it(`should return node URL object with expected properties if webpage starts with https://`, async () => {
    // ARRANGE
    const webpage = "https://www.facebook.com/myFarm/";

    const expected = {
      href: "https://www.facebook.com/myFarm/",
      origin: "https://www.facebook.com",
      protocol: "https:",
      username: "",
      password: "",
      host: "www.facebook.com",
      hostname: "www.facebook.com",
      port: "",
      pathname: "/myFarm/",
      search: "",
      searchParams: {},
      hash: "",
    };

    // ACT
    const actual = urlTransformer(webpage);

    // ASSERT
    assert.equal(actual.webpage, expected.webpage);
    assert.equal(actual.host, expected.host);
    assert.equal(actual.href, expected.href);
    assert.equal(actual.protocol, expected.protocol);
  });
});
