import "reflect-metadata";
import { DomainRepositoryImpl } from "./DomainRepositoryImpl";

jest.mock("./DomainRepositoryImpl");

describe("DomainRepositoryImpl", () => {
  it("should be exported", () => {
    expect(DomainRepositoryImpl).toBeDefined();
  });
});
