import "reflect-metadata";
import { GetAllDomains } from "./GetAllDomains";

jest.mock("./GetAllDomains");

describe("GetAllDomains", () => {
  it("should be exported", () => {
    expect(GetAllDomains).toBeDefined();
  });
});
