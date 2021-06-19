import { SubdomainModel } from "./SubdomainModel";

jest.mock("typeorm", () => {
  return {
    PrimaryGeneratedColumn: () => {},
    Column: () => {},
    Entity: () => {},
  };
});

describe("SubdomainModel", () => {
  it("should be exported", () => {
    expect(SubdomainModel).toBeDefined();
  });

  // TODO: expand tests
});
