import { ExpressController } from "./ExpressController";

jest.mock("typeorm");

describe("ExpressController", () => {
  it("should be exported", () => {
    expect(ExpressController).toBeDefined();
  });

  // TODO: expand tests
});
