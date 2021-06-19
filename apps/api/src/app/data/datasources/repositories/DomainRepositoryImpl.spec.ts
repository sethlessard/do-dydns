import { DomainRepositoryImpl } from "./DomainRepositoryImpl";
// import { Connection } from "typeorm";
import { mocked } from "ts-jest/utils";

jest.mock("./DomainRepositoryImpl");
const repoMock = mocked(DomainRepositoryImpl, true);
jest.mock("typeorm", () => {
  return {
    getRepository: () => repoMock,
    PrimaryGeneratedColumn: () => {},
    Column: () => {},
    Entity: () => {},
  };
});

describe("DomainRepositoryImpl", () => {
  beforeEach(() => {
    repoMock.mockClear();
  });

  it("should be exported", () => {
    expect(DomainRepositoryImpl).toBeDefined();
  });

  xit("should clear all domain entries", () => {
    const domainRepo = repoMock.mock;
  });
});
