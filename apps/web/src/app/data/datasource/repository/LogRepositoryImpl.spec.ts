import "reflect-metadata";
import { LogRepositoryImpl } from "./LogRepositoryImpl";

jest.mock("./LogRepositoryImpl");

describe("LogRepositoryImpl", () => {
  it("should be exported", () => {
    expect(LogRepositoryImpl).toBeDefined();
  });
});
