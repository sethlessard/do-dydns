import "reflect-metadata";
import { UpdateSubdomain } from "./index";

jest.mock("typeorm");

describe("UpdateSubdomain", () => {
  it("should be exported", () => {
    expect(UpdateSubdomain).toBeDefined();
  });

  // TODO: expand tests
});
