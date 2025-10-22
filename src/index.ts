import express from "express";
import routerV1 from "./api/v1/v1";
import { PORT } from "./config/env.constants";
import { createServer } from 'http';

const instance = express();

instance.use(express.json());

// init routes
instance.use('/api/v1', routerV1);
instance.get("/", (req, res) => {
  res.send("Hello World!");
});

// Create HTTP server
const server = createServer(instance);

// start the server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Handle server shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});