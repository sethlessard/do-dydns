import "reflect-metadata";
import { GetLogs } from "./GetLogs";

jest.mock("./GetLogs");

describe("GetLogs", () => {
  it("should be exported", () => {
    expect(GetLogs).toBeDefined();
  });
});
