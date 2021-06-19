import "reflect-metadata";
import React from "react";
// import { render } from "@testing-library/react";

// import { BrowserRouter } from "react-router-dom";

import { DODyDnsApp } from "./DODyDnsApp";
// import { container } from "tsyringe";

// TODO: configure mocks and register with tsyringe

describe("DODyDnsApp", () => {
  it("should be exported", () => {
    expect(DODyDnsApp).toBeTruthy();
  });

  // it('should have a greeting as the title', () => {
  //   const { getByText } = render(
  //     <BrowserRouter>
  //       <App />
  //     </BrowserRouter>
  //   );
  //
  //   expect(getByText('Welcome to web!')).toBeTruthy();
  // });
});
