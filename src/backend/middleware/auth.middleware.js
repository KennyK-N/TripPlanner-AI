import { auth } from "#backend/auth/auth.client.js";
import { toNodeHandler, fromNodeHeaders } from "better-auth/node";
import {
  AUTH_COOKIE_NAME,
  UID_COOKIE_NAME,
  SESSION_COOKIE_OPTIONS,
} from "#backend/util/constants.js";

let ERR_OBJ = {
  message: "Invalid Credentials/ User is not signed in",
  isAuthenticated: false,
  success: false,
};

//maybe rename
//Auth Validator Middleware
const authMiddleware = async (req, res, next) => {
  try {
    if (!req.cookies[AUTH_COOKIE_NAME]) {
      throw ERR_OBJ;
    }

    const response = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!response) {
      throw ERR_OBJ;
    }

    if (!req.cookies[UID_COOKIE_NAME]) {
      const id = response.user.id;
      res.cookie(UID_COOKIE_NAME, id, SESSION_COOKIE_OPTIONS);
    }

    req.body = response;
    next();
  } catch (err) {
    console.log(err);
    res.clearCookie(AUTH_COOKIE_NAME);
    res.clearCookie(UID_COOKIE_NAME);
    res.status(401).json(err);
  }
};

export default authMiddleware;
