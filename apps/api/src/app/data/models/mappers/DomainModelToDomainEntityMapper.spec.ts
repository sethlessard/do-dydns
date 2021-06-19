import { DomainModelToDomainEntityMapper } from "./DomainModelToDomainEntityMapper";
// import { mocked } from "ts-jest/utils";

jest.mock("./DomainModelToDomainEntityMapper");
jest.mock("typeorm");

describe("DomainModelToDomainEntityMapper", () => {
  it("should be exported", () => {
    expect(DomainModelToDomainEntityMapper).toBeDefined();
  });

  // TODO: expand tests
});
