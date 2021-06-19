import "reflect-metadata";
import { UpdateSettings } from "./UpdateSettings";

jest.mock("./UpdateSettings");

describe("UpdateSettings", () => {
  it("should be exported", () => {
    expect(UpdateSettings).toBeDefined();
  });
});
