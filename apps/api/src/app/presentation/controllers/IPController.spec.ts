import "reflect-metadata";
import { IPController } from "./IPController";

jest.mock("typeorm");

describe("IPController", () => {
  it("should be exported", () => {
    expect(IPController).toBeDefined();
  });

  // TODO: expand tests
});
