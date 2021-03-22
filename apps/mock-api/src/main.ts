/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from "express";
import { join } from "path";

const app = express();

app.get("/api", (req, res) => {
  res.send({ message: "Welcome to mock-api!" });
});

app.get("/api/v1/domain", (_, res) => {
  res.sendFile(join(__dirname, "assets/domain/GetDomains.success.json"));
});

app.get("/api/v1/ip", (_, res) => {
  res.sendFile(join(__dirname, "assets/ip/GetIP.success.json"));
});

app.get("/api/v1/log", (_, res) => {
  res.sendFile(join(__dirname, "assets/logs/GetLogs.success.json"));
});
app.delete("/api/v1/log", (_, res) => {
  res.json({ success: true, logs: [] });
});

const port = process.env.port ? parseInt(process.env.port) : 3333;
const server = app.listen(port, "0.0.0.0", () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on("error", console.error);
