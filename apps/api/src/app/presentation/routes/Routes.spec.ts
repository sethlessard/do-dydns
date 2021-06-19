import { Routes } from "./Routes";

jest.mock("typeorm");

describe("Routes", () => {
  it("should be exported", () => {
    expect(Routes).toBeDefined();
  });

  // TODO: expand tests
});
