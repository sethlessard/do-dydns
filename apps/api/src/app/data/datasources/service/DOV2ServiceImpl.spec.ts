import "reflect-metadata";
import { DOV2ServiceImpl } from "./DOV2ServiceImpl";
// import { mocked } from "ts-jest/utils";

jest.mock("./DOV2ServiceImpl");
jest.mock("typeorm");

describe("DOV2ServiceImpl", () => {
  it("should be exported", () => {
    expect(DOV2ServiceImpl).toBeDefined();
  });
});
