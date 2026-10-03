import express from "express";

const app = express();

app.get("/health", (req, res) => {
  console.log("auth service");
  return res.status(200).json({
    message: "Auth Service is up and running",
    success: true,
    status: "OK",
  });
});

export default app;
