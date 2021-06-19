import "reflect-metadata";
import { SubdomainController } from "./SubdomainController";

jest.mock("typeorm");

describe("SubdomainController", () => {
  it("should be exported", () => {
    expect(SubdomainController).toBeDefined();
  });

  // TODO: expand tests
});
