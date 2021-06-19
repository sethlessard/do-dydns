import { StoredModel } from "./StoredModel";

jest.mock("typeorm", () => {
  return {
    PrimaryGeneratedColumn: () => {},
    Column: () => {},
    Entity: () => {},
  };
});

describe("StoredModel", () => {
  it("should be exported", () => {
    expect(StoredModel).toBeDefined();
  });

  // TODO: expand tests
});
