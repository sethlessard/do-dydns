import "reflect-metadata";
import React from "react";

import Appbar from "./Appbar.component";

describe("Appbar", () => {
  it("should be exported", () => {
    expect(Appbar).toBeTruthy();
  });
});
