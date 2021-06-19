import "reflect-metadata";
import { SubdomainRepositoryImpl } from "./SubdomainRepositoryImpl";

jest.mock("./SubdomainRepositoryImpl");

describe("SubdomainRepositoryImpl", () => {
  it("should be exported", () => {
    expect(SubdomainRepositoryImpl).toBeDefined();
  });
});
