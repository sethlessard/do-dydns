import "reflect-metadata";
import { UpdateDomain } from "./index";

jest.mock("typeorm");

describe("UpdateDomain", () => {
  it("should be exported", () => {
    expect(UpdateDomain).toBeDefined();
  });

  // TODO: expand tests
});
