import "reflect-metadata";
import { SettingsRepositoryImpl } from "./SettingsRepositoryImpl";

jest.mock("./SettingsRepositoryImpl");

describe("SettingsRepositoryImpl", () => {
  it("should be exported", () => {
    expect(SettingsRepositoryImpl).toBeDefined();
  });
});
