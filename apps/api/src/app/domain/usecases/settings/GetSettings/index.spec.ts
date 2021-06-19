import "reflect-metadata";
import { GetSettings } from "./index";

jest.mock("typeorm");

describe("GetSettings", () => {
  it("should be exported", () => {
    expect(GetSettings).toBeDefined();
  });

  // TODO: expand tests
});
