import "reflect-metadata";
import { GetCurrentIPAddress } from "./GetCurrentIPAddress";

jest.mock("./GetCurrentIPAddress");

describe("GetCurrentIPAddress", () => {
  it("should be exported", () => {
    expect(GetCurrentIPAddress).toBeDefined();
  });
});
