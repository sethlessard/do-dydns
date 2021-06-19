import "reflect-metadata";
import { SyncWithDigitalOcean } from "./SyncWithDigitalOcean";

jest.mock("./SyncWithDigitalOcean");

describe("SyncWithDigitalOcean", () => {
  it("should be exported", () => {
    expect(SyncWithDigitalOcean).toBeDefined();
  });
});
