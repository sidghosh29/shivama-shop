import express from "express";
/* The below two lines will get all the environment variables 
from the .env file and add them to process.env */
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
/*...*/

import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const port = process.env.PORT || 5000;
const baseUrl = "/api";

connectDB();

const app = express();

// Body parser middleware
app.use(express.json());
// Above is a middleware to parse JSON bodies in requests.
// It populates req.body with the parsed data.

app.use(express.urlencoded({ extended: true }));
// Above is a middleware to parse URL-encoded bodies (like form submissions).
// extended: true allows for rich objects and arrays to be encoded into the
// URL-encoded format.

app.use(cookieParser());
// Above is a middleware to parse cookies from the request headers.
// It populates req.cookies with an object of cookie name-value pairs.

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.get("/health", (req, res) => {
  res.send("OK");
});

app.use(baseUrl + "/products", productRoutes);
app.use(baseUrl + "/users", userRoutes);

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
