import "reflect-metadata";
import { GetAllLogs } from "./index";

jest.mock("typeorm");

describe("GetAllLogs", () => {
  it("should be exported", () => {
    expect(GetAllLogs).toBeDefined();
  });

  // TODO: expand tests
});
