import { TypeormConnectionRegister } from "./TypeormConnectionRegister";

jest.mock("typeorm");

describe("TypeormConnectionRegister", () => {
  it("should be exported", () => {
    expect(TypeormConnectionRegister).toBeDefined();
  });

  // TODO: expand tests
});
