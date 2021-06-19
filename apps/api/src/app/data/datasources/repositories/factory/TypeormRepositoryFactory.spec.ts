import { TypeormRepositoryFactory } from "./TypeormRepositoryFactory";
// import { mocked } from "ts-jest/utils";

jest.mock("./TypeormRepositoryFactory");
// const mock = mocked(TypeormRepositoryFactory, true);
jest.mock("typeorm");

describe("TypeormRepositoryFactory", () => {
  it("should be exported", () => {
    expect(TypeormRepositoryFactory).toBeDefined();
  });
});
