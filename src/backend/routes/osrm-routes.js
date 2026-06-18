import { getPreciseRoute } from "#backend/services/osrm.service.js";
import express from "express";
const osrmRouter = express.Router();
/*
body format:
{
    "coordinate": [
        [-123.1, 49.3],[-123.12,49.28]
    ],
    "transportation": "foot" or "driving" or "bicycle"
}

*/
osrmRouter.post("/preciseRoute", async (req, res, next) => {
  try {
    const { coordinate, transportation } = req.body;
    const response = await getPreciseRoute(coordinate, transportation);
    if (!response.success) throw new Error(response.msg);
    res.json(response);
  } catch (err) {
    console.error("Weather API error:", err.message);
    next(err);
  }
});

export default osrmRouter;
