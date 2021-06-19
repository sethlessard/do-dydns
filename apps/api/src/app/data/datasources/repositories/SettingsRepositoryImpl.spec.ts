import { SettingsRepositoryImpl } from "./SettingsRepositoryImpl";
// import { Connection } from "typeorm";
import { mocked } from "ts-jest/utils";

const repoMock = mocked(SettingsRepositoryImpl);
jest.mock("typeorm", () => {
  return {
    getRepository: () => repoMock,
    PrimaryGeneratedColumn: () => {},
    Column: () => {},
    Entity: () => {},
  };
});

jest.mock("./SettingsRepositoryImpl");

describe("SettingsRepositoryImpl", () => {
  // const MockedDomainRepositoryImpl = mocked(IPRepositoryImpl, true);
  // beforeEach(() => {
  //   MockedDomainRepositoryImpl.mockClear();
  // });

  it("should be exported", () => {
    expect(SettingsRepositoryImpl).toBeDefined();
  });
});
