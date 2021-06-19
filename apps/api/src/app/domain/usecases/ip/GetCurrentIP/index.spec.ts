import "reflect-metadata";
import { GetCurrentIP } from "./index";

jest.mock("typeorm");

describe("GetCurrentIP", () => {
  it("should be exported", () => {
    expect(GetCurrentIP).toBeDefined();
  });

  // TODO: expand tests
});
