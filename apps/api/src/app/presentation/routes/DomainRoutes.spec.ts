import "reflect-metadata";
import { DomainRoutes } from "./DomainRoutes";

jest.mock("typeorm");

describe("DomainRoutes", () => {
  it("should be exported", () => {
    expect(DomainRoutes).toBeDefined();
  });

  // TODO: expand tests
});
