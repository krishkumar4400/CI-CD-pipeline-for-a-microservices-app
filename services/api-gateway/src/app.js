import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import proxyRoutes from "./routes/proxy.js";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("combined"));

app.get("/api/v1/health", (_req, res) => {
  return res.status(200).json({
    status: "ok",
    service: "api-gateway",
  });
});

app.use(proxyRoutes);

export default app;
