import "dotenv/config";
import http from "http";
import app from "./src/app.js";
import { env } from "./src/config/env.js";

const server = http.createServer(app);

const port = env.port;

server.listen(env.port, () => {
  console.log(`API Gateway running on port ${env.port}`);
});
