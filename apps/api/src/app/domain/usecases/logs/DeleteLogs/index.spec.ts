import "reflect-metadata";
import { DeleteLogs } from "./index";

jest.mock("typeorm");

describe("DeleteLogs", () => {
  it("should be exported", () => {
    expect(DeleteLogs).toBeDefined();
  });

  // TODO: expand tests
});
