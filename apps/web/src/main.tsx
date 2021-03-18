import "reflect-metadata";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { DODyDnsApp } from "./app/presentation/DODyDnsApp";
import { container } from "tsyringe";
import { IPRepositoryImpl } from "./app/data/datasource/repository/IPRepositoryImpl";
import { DomainRepositoryImpl } from "./app/data/datasource/repository/DomainRepositoryImpl";
import { SettingsRepositoryImpl } from "./app/data/datasource/repository/SettingsRepositoryImpl";

// register the dependencies with tsyringe
container.register("DomainRepository", { useClass: DomainRepositoryImpl });
container.register("IPRepository", { useClass: IPRepositoryImpl });
container.register("SettingsRepository", { useClass: SettingsRepositoryImpl });

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <DODyDnsApp />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
