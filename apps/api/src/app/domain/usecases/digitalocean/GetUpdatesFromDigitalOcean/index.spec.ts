import "reflect-metadata";
import { GetUpdatesFromDigitalOcean } from "./index";

jest.mock("typeorm");

describe("GetUpdatesFromDigitalOceanUseCase", () => {
  it("should be exported", () => {
    expect(GetUpdatesFromDigitalOcean).toBeDefined();
  });

  // TODO: expand tests
});
