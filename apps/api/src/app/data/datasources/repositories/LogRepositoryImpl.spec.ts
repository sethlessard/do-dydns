import { LogRepositoryImpl } from "./LogRepositoryImpl";
// import { Connection } from "typeorm";
import { mocked } from "ts-jest/utils";

const repoMock = mocked(LogRepositoryImpl);
jest.mock("typeorm", () => {
  // repoMock.find.mockResolvedValue(['ok']);

  return {
    getRepository: () => repoMock,
    PrimaryGeneratedColumn: () => {},
    Column: () => {},
    Entity: () => {},
  };
});

jest.mock("./LogRepositoryImpl");

describe("LogRepositoryImpl", () => {
  // const MockedDomainRepositoryImpl = mocked(IPRepositoryImpl, true);
  // beforeEach(() => {
  //   MockedDomainRepositoryImpl.mockClear();
  // });

  it("should be exported", () => {
    expect(LogRepositoryImpl).toBeDefined();
  });
});
