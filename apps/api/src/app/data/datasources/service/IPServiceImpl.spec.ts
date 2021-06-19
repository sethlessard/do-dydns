import { IPServiceImpl } from "./IPServiceImpl";
// import { mocked } from "ts-jest/utils";

jest.mock("./IPServiceImpl");
jest.mock("typeorm");

describe("IPServiceImpl", () => {
  it("should be exported", () => {
    expect(IPServiceImpl).toBeDefined();
  });
});
