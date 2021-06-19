import "reflect-metadata";
import { IPRepositoryImpl } from "./IPRepositoryImpl";

jest.mock("./IPRepositoryImpl");

describe("IPRepositoryImpl", () => {
  it("should be exported", () => {
    expect(IPRepositoryImpl).toBeDefined();
  });
});
