import { IPRepositoryImpl } from "./IPRepositoryImpl";
// import { Connection } from "typeorm";
import { mocked } from "ts-jest/utils";

const repoMock = mocked(IPRepositoryImpl);
jest.mock("typeorm", () => {
  // repoMock.find.mockResolvedValue(['ok']);

  return {
    getRepository: () => repoMock,
    PrimaryGeneratedColumn: () => {},
    Column: () => {},
    Entity: () => {},
  };
});

jest.mock("./IPRepositoryImpl");

describe("IPRepositoryImpl", () => {
  // const MockedDomainRepositoryImpl = mocked(IPRepositoryImpl, true);
  // beforeEach(() => {
  //   MockedDomainRepositoryImpl.mockClear();
  // });

  it("should be exported", () => {
    expect(IPRepositoryImpl).toBeDefined();
  });
});
