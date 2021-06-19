import { SettingsModel } from "./SettingsModel";

jest.mock("typeorm", () => {
  return {
    PrimaryGeneratedColumn: () => {},
    Column: () => {},
    Entity: () => {},
  };
});

describe("SettingsModel", () => {
  it("should be exported", () => {
    expect(SettingsModel).toBeDefined();
  });

  // TODO: expand tests
});
