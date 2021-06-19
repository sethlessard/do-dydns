import "reflect-metadata";
import { DigitalOceanController } from "./DigitalOceanController";

jest.mock("typeorm");

describe("DigitalOceanController", () => {
  it("should be exported", () => {
    expect(DigitalOceanController).toBeDefined();
  });

  // TODO: expand tests
});
