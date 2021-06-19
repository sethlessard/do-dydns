import "reflect-metadata";
import { DeleteDomain } from "./index";

jest.mock("typeorm");

describe("DeleteDomain", () => {
  it("should be exported", () => {
    expect(DeleteDomain).toBeDefined();
  });

  // TODO: expand tests
});
