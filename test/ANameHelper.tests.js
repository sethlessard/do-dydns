const { assert } = require("chai");
const ANameHelper = require("../src/ANameHelper");

describe("ANameHelper tests", () => {
  it("Should return '@' when calculating the A Name for a domain", () => {
    const value = ANameHelper.calculateANameValueForSubdomain("sethlessard.com", "sethlessard.com");
    assert.equal(value, "@");
  });
  it("Should return the correct value for subdomains", () => {
    assert.equal(ANameHelper.calculateANameValueForSubdomain("sethlessard.com", "test.sethlessard.com"), "test");
  });
});
