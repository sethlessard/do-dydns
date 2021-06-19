import { SubdomainModelToSubdomainEntityMapper } from "./SubdomainModelToSubdomainEntityMapper";
// import { mocked } from "ts-jest/utils";

jest.mock("./SubdomainModelToSubdomainEntityMapper");
jest.mock("typeorm");

describe("SubdomainModelToSubdomainEntityMapper", () => {
  it("should be exported", () => {
    expect(SubdomainModelToSubdomainEntityMapper).toBeDefined();
  });

  // TODO: expand tests
});
