import { Router } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

import { env } from "../config/env.js";

const router = Router();

router.use(
  "/api/v1/auth",
  createProxyMiddleware({
    target: env.services.auth,
    changeOrigin: true,
  }),
);

router.use(
  "/api/v1/products",
  createProxyMiddleware({
    target: env.services.product,
    changeOrigin: true,
  }),
);

router.use(
  "/api/v1/orders",
  createProxyMiddleware({
    target: env.services.order,
    changeOrigin: true,
  }),
);

export default router;
