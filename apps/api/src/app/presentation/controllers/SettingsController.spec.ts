import "reflect-metadata";
import { SettingsController } from "./SettingsController";

jest.mock("typeorm");

describe("SettingsController", () => {
  it("should be exported", () => {
    expect(SettingsController).toBeDefined();
  });

  // TODO: expand tests
});
