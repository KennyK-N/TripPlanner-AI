import config from "#backend/config/index.js";
import cookieParser from "cookie-parser";
import express from "express";
import securityMiddleware from "#backend/middleware/security.middleware.js";
import loggerMiddleware from "#backend/middleware/logger.middleware.js";
import errorHandlerMiddleware from "#backend/middleware/errorHandler.middleware.js";
import Router from "#backend/routes/index.js";
import data from "#backend/data/data.json" with { type: "json" };
import { betterAuthRouter } from "#backend/routes/auth-routes.js";

console.log(data);

const app = express();

app.use(loggerMiddleware);
app.use(securityMiddleware);
app.use(cookieParser());

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

// Mount all routes in here
app.use(betterAuthRouter);
//mount to v1 later
app.use("/api", Router);
app.use(Router);

// Error handler middleware has to be last
app.use(errorHandlerMiddleware);

app.listen(config["BACK_END_PORT"], () => {
  console.log(
    `Server running on port ${config["BACK_END_PORT"]} with ${process.env.NODE_ENV}`,
  );
});

// TODO: WILL NEED TO HANDLE STALE LOGIN, i.E IF NOT IN the SESSION DB TABLE CLEAR THE COOKIE CUZ ITS STALE
// TODO: add sanitizaiton later
