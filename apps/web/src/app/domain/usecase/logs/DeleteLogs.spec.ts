import "reflect-metadata";
import { DeleteLogs } from "./DeleteLogs";

jest.mock("./DeleteLogs");

describe("DeleteLogs", () => {
  it("should be exported", () => {
    expect(DeleteLogs).toBeDefined();
  });
});
