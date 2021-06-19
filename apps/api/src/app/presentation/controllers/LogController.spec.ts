import "reflect-metadata";
import { LogController } from "./LogController";

jest.mock("typeorm");

describe("LogController", () => {
  it("should be exported", () => {
    expect(LogController).toBeDefined();
  });

  // TODO: expand tests
});
