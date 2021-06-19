import "reflect-metadata";
import { SettingsRoutes } from "./SettingsRoutes";

jest.mock("typeorm");

describe("SettingsRoutes", () => {
  it("should be exported", () => {
    expect(SettingsRoutes).toBeDefined();
  });

  // TODO: expand tests
});
