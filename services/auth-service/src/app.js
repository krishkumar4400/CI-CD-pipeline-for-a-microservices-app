import express from "express";
import cors from "cors";
import userRouter from "./routes/user.route.js";

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

// routes
app.use("/api/v1/auth", userRouter);

export default app;
