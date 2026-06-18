import axios from "axios";

const URL = "https://api.open-meteo.com/v1/forecast?";
const PARAMS = "daily=temperature_2m_mean,precipitation_sum";
const FORECAST = 1;

export async function getWeatherMetrics(latitude, longitude) {
  try {
    const res = await axios.get(
      `${URL}latitude=${latitude}&longitude=${longitude}&${PARAMS}&forecast_days=${FORECAST}`,
    );

    return {
      success: true,
      msg: "Weather received successfully",
      data: res.data,
    };
  } catch (err) {
    console.error("Weather API error:", err.message);
    return {
      success: false,
      msg: "Failed to fetch weather data",
      data: null,
    };
  }
}
