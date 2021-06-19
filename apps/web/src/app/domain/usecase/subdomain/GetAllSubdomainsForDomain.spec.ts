import "reflect-metadata";
import { GetAllSubdomainsForDomain } from "./GetAllSubdomainsForDomain";

jest.mock("./GetAllSubdomainsForDomain");

describe("GetAllSubdomainsForDomain", () => {
  it("should be exported", () => {
    expect(GetAllSubdomainsForDomain).toBeDefined();
  });
});
