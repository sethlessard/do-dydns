import "reflect-metadata";
import React from "react";

import { Subdomain } from "./Subdomain.component";

describe("Subdomain", () => {
  it("should be exported", () => {
    expect(Subdomain).toBeTruthy();
  });
});
