import "reflect-metadata";
import { CreateNewSubdomain } from "./index";

jest.mock("typeorm");

describe("CreateNewSubdomain", () => {
  it("should be exported", () => {
    expect(CreateNewSubdomain).toBeDefined();
  });

  // TODO: expand tests
});
