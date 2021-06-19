import "reflect-metadata";
import { DigitalOceanRoutes } from "./DigitalOceanRoutes";

jest.mock("typeorm");

describe("DigitalOceanRoutes", () => {
  it("should be exported", () => {
    expect(DigitalOceanRoutes).toBeDefined();
  });

  // TODO: expand tests
});
