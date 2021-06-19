import { IPAddressModel } from "./IPAddressModel";

jest.mock("typeorm", () => {
  return {
    PrimaryGeneratedColumn: () => {},
    Column: () => {},
    Entity: () => {},
  };
});

describe("IPAddressModel", () => {
  it("should be exported", () => {
    expect(IPAddressModel).toBeDefined();
  });

  // TODO: expand tests
});
