import { getWeatherMetrics } from "#backend/services/weather.service.js";
import express from "express";
const weatherRouter = express.Router();

// used for n8n
// but will need a superadmin account
weatherRouter.get("/WeatherMetrics", async (req, res, next) => {
  // url format http://localhost:5000/WeatherMetrics?latitude=49.2827&longitude=123.1207
  try {
    const { latitude, longitude } = req.query;
    const response = await getWeatherMetrics(latitude, longitude);
    if (!response.success) throw new Error(response.msg);
    res.json(response);
  } catch (err) {
    console.error("Weather API error:", err.message);
    next(err);
  }
});

export default weatherRouter;
