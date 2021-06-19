import "reflect-metadata";
import { GetSettings } from "./GetSettings";

jest.mock("./GetSettings");

describe("GetSettings", () => {
  it("should be exported", () => {
    expect(GetSettings).toBeDefined();
  });
});
