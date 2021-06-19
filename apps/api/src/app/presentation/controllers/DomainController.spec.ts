import "reflect-metadata";
import { DomainController } from "./DomainController";

jest.mock("typeorm");

describe("DomainController", () => {
  it("should be exported", () => {
    expect(DomainController).toBeDefined();
  });

  // TODO: expand tests
});
