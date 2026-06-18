import chalk from "chalk";
import express from "express";
import { authRouter } from "#backend/routes/auth-routes.js";
import groqRouter from "#backend/routes/groq-routes.js";
import weatherRouter from "#backend/routes/weather-routes.js";
import osrmRouter from "#backend/routes/osrm-routes.js";

const routerMiddleware = express.Router();
// For mounting all routes at one place, then for the outermost route you would mount whatever is returned from here

const defaultRoute = routerMiddleware.get("/", (req, res, next) => {
  try {
    res.redirect("http://localhost:5173/");
  } catch (error) {
    next(error);
  }
});

// This middleware handles all unmatched routes and should be registered after all defined routes
// but before the error-handling middleware to ensure it only runs when no other route matches.
function invalidRouteHandler(req, res, next) {
  const message = "Invalid Routes";
  console.log(`Error: ${chalk.red(message)} redirecting to auth/me`);
  res.redirect("/auth/me");
}

const Router = [
  defaultRoute,
  routerMiddleware.use("/auth", authRouter),
  routerMiddleware.use("/ai", groqRouter),
  weatherRouter,
  osrmRouter,
  invalidRouteHandler,
];

export default Router;
