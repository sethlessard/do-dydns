import "reflect-metadata";
import { ResetSettings } from "./ResetSettings";

jest.mock("./ResetSettings");

describe("ResetSettings", () => {
  it("should be exported", () => {
    expect(ResetSettings).toBeDefined();
  });
});
