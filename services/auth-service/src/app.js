import express from "express";
import cors from "cors"

const app = express();

// middlewares
app.use(express.json());
app.use(cors());

app.get("/health", (req, res) => {
  console.log("auth service");
  return res.status(200).json({
    message: "Auth Service is up and running",
    success: true,
    status: "OK",
  });
});

export default app;
