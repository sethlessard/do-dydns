import "reflect-metadata";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { DODyDnsApp } from "./app/presentation/DODyDnsApp";
import {container} from "tsyringe";
import {IPRepositoryImpl} from "./app/data/datasource/repository/IPRepositoryImpl";

// register the dependencies with tsyringe
container.register("IPRepository", { useClass: IPRepositoryImpl });

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <DODyDnsApp />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
