import "reflect-metadata";
import { IPRoutes } from "./IPRoutes";

jest.mock("typeorm");

describe("IPRoutes", () => {
  it("should be exported", () => {
    expect(IPRoutes).toBeDefined();
  });

  // TODO: expand tests
});
