import "reflect-metadata";
import { ResetSettings } from "./index";

jest.mock("typeorm");

describe("ResetSettings", () => {
  it("should be exported", () => {
    expect(ResetSettings).toBeDefined();
  });

  // TODO: expand tests
});
