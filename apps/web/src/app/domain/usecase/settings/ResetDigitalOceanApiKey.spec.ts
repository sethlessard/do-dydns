import "reflect-metadata";
import { ResetDigitalOceanApiKey } from "./ResetDigitalOceanApiKey";

jest.mock("./ResetDigitalOceanApiKey");

describe("ResetDigitalOceanApiKey", () => {
  it("should be exported", () => {
    expect(ResetDigitalOceanApiKey).toBeDefined();
  });
});
