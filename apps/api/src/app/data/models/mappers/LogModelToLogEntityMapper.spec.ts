import { LogModelToLogEntityMapper } from "./LogModelToLogEntityMapper";
// import { mocked } from "ts-jest/utils";

jest.mock("./LogModelToLogEntityMapper");
jest.mock("typeorm");

describe("LogModelToLogEntityMapper", () => {
  it("should be exported", () => {
    expect(LogModelToLogEntityMapper).toBeDefined();
  });

  // TODO: expand tests
});
