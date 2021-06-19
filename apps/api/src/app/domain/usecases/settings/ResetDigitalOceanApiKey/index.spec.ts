import "reflect-metadata";
import { ResetDigitalOceanApiKey } from "./index";

jest.mock("typeorm");

describe("ResetDigitalOceanApiKey", () => {
  it("should be exported", () => {
    expect(ResetDigitalOceanApiKey).toBeDefined();
  });

  // TODO: expand tests
});
