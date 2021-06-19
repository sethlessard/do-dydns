import { SettingsModelToSettingsEntityMapper } from "./SettingsModelToSettingsEntityMapper";
// import { mocked } from "ts-jest/utils";

jest.mock("./SettingsModelToSettingsEntityMapper");
jest.mock("typeorm");

describe("SettingsModelToSettingsEntityMapper", () => {
  it("should be exported", () => {
    expect(SettingsModelToSettingsEntityMapper).toBeDefined();
  });

  // TODO: expand tests
});
