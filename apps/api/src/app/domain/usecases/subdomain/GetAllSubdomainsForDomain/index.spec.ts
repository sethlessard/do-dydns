import "reflect-metadata";
import { GetAllSubdomainsForDomain } from "./index";

jest.mock("typeorm");

describe("GetAllSubdomainsForDomain", () => {
  it("should be exported", () => {
    expect(GetAllSubdomainsForDomain).toBeDefined();
  });

  // TODO: expand tests
});
