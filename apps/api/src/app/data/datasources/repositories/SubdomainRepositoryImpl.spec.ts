import { SubdomainRepositoryImpl } from "./SubdomainRepositoryImpl";
// import { Connection } from "typeorm";
import { mocked } from "ts-jest/utils";

const repoMock = mocked(SubdomainRepositoryImpl);
jest.mock("typeorm", () => {
  return {
    getRepository: () => repoMock,
    PrimaryGeneratedColumn: () => {},
    Column: () => {},
    Entity: () => {},
  };
});

jest.mock("./SubdomainRepositoryImpl");

describe("SubdomainRepositoryImpl", () => {
  // const MockedDomainRepositoryImpl = mocked(IPRepositoryImpl, true);
  // beforeEach(() => {
  //   MockedDomainRepositoryImpl.mockClear();
  // });

  it("should be exported", () => {
    expect(SubdomainRepositoryImpl).toBeDefined();
  });
});
