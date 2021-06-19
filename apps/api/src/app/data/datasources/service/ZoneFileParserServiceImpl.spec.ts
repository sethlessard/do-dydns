import { ZoneFileParserServiceImpl } from "./ZoneFileParserServiceImpl";
// import { mocked } from "ts-jest/utils";

jest.mock("./ZoneFileParserServiceImpl");
jest.mock("typeorm");

describe("ZoneFileParserServiceImpl", () => {
  it("should be exported", () => {
    expect(ZoneFileParserServiceImpl).toBeDefined();
  });
});
