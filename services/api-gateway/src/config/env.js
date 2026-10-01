import dotenv from "dotenv";

dotenv.config();

export const env = {
  nodeEnv: process.env.NODE_ENV || "development",

  port: Number(process.env.PORT) || 5000,

  services: {
    auth: process.env.AUTH_SERVICE_URL,
    product: process.env.PRODUCT_SERVICE_URL,
    order: process.env.ORDER_SERVICE_URL
  }
};
