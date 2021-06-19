import "reflect-metadata";
import { LogRoutes } from "./LogRoutes";

jest.mock("typeorm");

describe("LogRoutes", () => {
  it("should be exported", () => {
    expect(LogRoutes).toBeDefined();
  });

  // TODO: expand tests
});
