import "reflect-metadata";
import { DigitalOceanRepositoryImpl } from "./DigitalOceanRepositoryImpl";

jest.mock("./DigitalOceanRepositoryImpl");

describe("DigitalOceanRepositoryImpl", () => {
  it("should be exported", () => {
    expect(DigitalOceanRepositoryImpl).toBeDefined();
  });
});
