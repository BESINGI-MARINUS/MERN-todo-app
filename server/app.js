const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");

const userRoutes = require("./Routes/userRoutes");
const globalErrorHandler = require("./utils/globalErrorHandler");
const AppError = require("./utils/AppError");
const taskRoutes = require("./Routes/taskRoutes");

const app = express();

// CORS configuration
// const corsOptions = {
//   origin:
//     process.env.NODE_ENV === "production"
//       ? process.env.FRONTEND_URL || false
//       : "http://localhost:8000",
//   credentials: true,
// };

app.use(cors());

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

// Body parser, reading data from body into req.body
app.use(express.json());

// Serve static files from the React app build directory
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

// ROUTES
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/tasks", taskRoutes);

// Catch all handler: send back React's index.html file for client-side routing
if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });
}

app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);
module.exports = app;
