import "reflect-metadata";
import React from "react";

import { NoDomains } from "./NoDomains.component";

describe("NoDomains", () => {
  it("should be exported", () => {
    expect(NoDomains).toBeTruthy();
  });
});
