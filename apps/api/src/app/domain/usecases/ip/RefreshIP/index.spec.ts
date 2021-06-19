import "reflect-metadata";
import { RefreshIP } from "./index";

jest.mock("typeorm");

describe("RefreshIP", () => {
  it("should be exported", () => {
    expect(RefreshIP).toBeDefined();
  });

  // TODO: expand tests
});
