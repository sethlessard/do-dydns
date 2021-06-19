import { LogModel } from "./LogModel";

jest.mock("typeorm", () => {
  return {
    PrimaryGeneratedColumn: () => {},
    Column: () => {},
    Entity: () => {},
  };
});

describe("LogModel", () => {
  it("should be exported", () => {
    expect(LogModel).toBeDefined();
  });

  // TODO: expand tests
});
