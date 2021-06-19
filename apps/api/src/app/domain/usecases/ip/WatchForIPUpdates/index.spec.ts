import "reflect-metadata";
import { WatchForIPUpdates } from "./index";

jest.mock("typeorm");

describe("WatchForIPUpdates", () => {
  it("should be exported", () => {
    expect(WatchForIPUpdates).toBeDefined();
  });

  // TODO: expand tests
});
