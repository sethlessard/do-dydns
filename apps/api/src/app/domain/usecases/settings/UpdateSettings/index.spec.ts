import "reflect-metadata";
import { UpdateSettings } from "./index";

jest.mock("typeorm");

describe("UpdateSettings", () => {
  it("should be exported", () => {
    expect(UpdateSettings).toBeDefined();
  });

  // TODO: expand tests
});
