import "dotenv/config";
import http from "http";
import app from "./src/app.js";
import { env } from "./src/config/env.js";
import connectToDB from "./src/config/database.js";

const server = http.createServer(app);

const port = env.port;

await connectToDB();

server.listen(port, () => {
    console.log(`API Gateway running on port ${port}`);
});
