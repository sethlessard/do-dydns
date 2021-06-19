import "reflect-metadata";
import { DeleteSubdomain } from "./index";

jest.mock("typeorm");

describe("DeleteSubdomain", () => {
  it("should be exported", () => {
    expect(DeleteSubdomain).toBeDefined();
  });

  // TODO: expand tests
});
