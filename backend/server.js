import express from "express";
/* The below two lines will get all the environment variables 
from the .env file and add them to process.env */
import dotenv from "dotenv";
dotenv.config();
/*...*/

import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

import productRoutes from "./routes/productRoutes.js";

const port = process.env.PORT || 5000;
const baseUrl = "/api";

connectDB();

const app = express();

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.get("/health", (req, res) => {
  res.send("OK");
});

app.use(baseUrl + "/products", productRoutes);

// Error handling middleware
app.use(notFound);
// The above executes if no route matches the request,
// creating a 404 error and passing it to the next middleware (errorHandler).
app.use(errorHandler);
// This is the last middleware in the stack, and it handles any errors passed to it.

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// In Express.js, app.listen() is basically syntactic sugar over Node.js’s built-in
// http.createServer() + .listen().
// Express internally does something like this:
// app.listen = function (...args) {
//   const server = http.createServer(this);
//   return server.listen(...args);
// };
