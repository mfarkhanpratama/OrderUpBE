const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

// Konfigurasi proxy untuk User Service
app.use(
  "/users",
  createProxyMiddleware({
    target: "http://localhost:3001",
    changeOrigin: true,
  })
);

// Konfigurasi proxy untuk Product Service
app.use(
  "/products",
  createProxyMiddleware({
    target: "http://localhost:3002",
    changeOrigin: true,
  })
);

// Konfigurasi proxy untuk Order Service
app.use(
  "/orders",
  createProxyMiddleware({
    target: "http://localhost:3003",
    changeOrigin: true,
  })
);

// Konfigurasi proxy untuk Report Service
app.use(
  "/reports",
  createProxyMiddleware({
    target: "http://localhost:3004",
    changeOrigin: true,
  })
);

// Menjalankan server di port 3000
app.listen(3000, () => {
  console.log("API Gateway berjalan di http://localhost:3000");
});
