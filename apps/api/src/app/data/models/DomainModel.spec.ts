import { DomainModel } from "./DomainModel";

jest.mock("typeorm", () => {
  return {
    PrimaryGeneratedColumn: () => {},
    Column: () => {},
    Entity: () => {},
  };
});

describe("DomainModel", () => {
  it("should be exported", () => {
    expect(DomainModel).toBeDefined();
  });

  // TODO: expand tests
});
