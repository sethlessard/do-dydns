import "reflect-metadata";
import { Api } from "./Api";

jest.mock("./Api");

describe("Api", () => {
  it("should be exported", () => {
    expect(Api).toBeDefined();
  });
});
