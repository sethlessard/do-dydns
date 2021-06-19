import "reflect-metadata";
import { GetAllDomains } from "./index";

jest.mock("typeorm");

describe("GetAllDomains", () => {
  it("should be exported", () => {
    expect(GetAllDomains).toBeDefined();
  });

  // TODO: expand tests
});
