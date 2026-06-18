import axios from "axios";
import { error } from "better-auth/api";

const URL = "https://router.project-osrm.org/route/v1";
const OVERVEIW = "overview=full";

("https://router.project-osrm.org/route/v1/driving/-123.1,49.3;-123.12,49.28?overview=full");

export async function getPreciseRoute(coordinate, transportation) {
  try {
    const queryParam = coordinate
      .map((prev) => {
        return prev.join();
      })
      .join(";");

    const res = await axios.get(
      `${URL}/${transportation}/${queryParam}?${OVERVEIW}`,
    );
    return {
      success: true,
      msg: "Routes received successfully",
      data: res.data,
    };
  } catch (err) {
    return {
      success: false,
      msg: err,
      data: null,
    };
  }
}
