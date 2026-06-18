import express from "express";
import { auth } from "#backend/auth/auth.client.js";
import { toNodeHandler, fromNodeHeaders } from "better-auth/node";
import authMiddleware from "#backend/middleware/auth.middleware.js";
import { AUTH_COOKIE_NAME, UID_COOKIE_NAME } from "#backend/util/constants.js";

const betterAuthRouter = express.Router();
const authRouter = express.Router();
const CALL_BACK_URL = "http://localhost:5173/";

// Note: Place /api/auth/error before the catch-all/general route/handler
// because /api/auth/*splat may match incoming requests first and prevent the
// specific error handler from being reached.
betterAuthRouter.all("/api/auth/error", (req, res) => {
  res.redirect("http://localhost:5173/");
});

betterAuthRouter.all("/api/auth/*splat", toNodeHandler(auth));

authRouter.get("/me", authMiddleware, async (req, res) => {
  try {
    const session = req.body;
    res.json({
      isAuthenticated: true,
      ...session,
      msg: "User is authenticated",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

authRouter.post("/sign-up", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const name = "placeholder";
    const image = "placeholder";

    const data = await auth.api.signUpEmail({
      headers: fromNodeHeaders(req.headers),
      returnHeaders: true,
      body: {
        name: name,
        email: email,
        password: password,
        image: image,
        callbackURL: CALL_BACK_URL,
      },
    });
    var cookie = data.headers.get("set-cookie");

    if (cookie) {
      res.clearCookie(UID_COOKIE_NAME);
      res.append("Set-Cookie", cookie);
    }

    res.json({ success: true, msg: "User has successfully signed up" });
  } catch (err) {
    next(err);
  }
});

authRouter.post("/login", async (req, res, next) => {
  try {
    // if (req.cookies[AUTH_COOKIE_NAME]) {
    //   throw new Error("User is already logged in");
    // }

    const { email, password } = req.body;
    const data = await auth.api.signInEmail({
      headers: fromNodeHeaders(req.headers),
      returnHeaders: true,
      body: {
        email: email,
        password: password,
      },
    });

    var cookie = data.headers.get("set-cookie");

    if (cookie) {
      res.clearCookie(UID_COOKIE_NAME);
      res.append("Set-Cookie", cookie);
    }
    console.log(cookie);
    res.json({ success: true, msg: "User has successfully logged in" });
  } catch (err) {
    next(err);
  }
});

authRouter.post("/sign-out", authMiddleware, async (req, res, next) => {
  try {
    const data = await auth.api.signOut({
      returnHeaders: true,
      headers: fromNodeHeaders(req.headers),
    });

    var cookie = data.headers.get("set-cookie");

    if (cookie) {
      res.clearCookie(UID_COOKIE_NAME);
      res.append("Set-Cookie", cookie);
    }

    return res.json({
      success: true,
      msg: "User has successfully logged out",
    });
  } catch (err) {
    next(err);
  }
});

authRouter.get("/google-sign-in", async (req, res, next) => {
  try {
    const data = await auth.api.signInSocial({
      body: {
        provider: "google",
        callbackURL: CALL_BACK_URL,
      },
      returnHeaders: true,
      headers: fromNodeHeaders(req.headers),
    });
    console.log(data.response.url);
    const cookie = data.headers.get("set-cookie");

    if (cookie) {
      res.clearCookie(UID_COOKIE_NAME);
      res.append("Set-Cookie", cookie);
    }

    return res.redirect(data.response.url);
  } catch (err) {
    next(err);
  }
});

authRouter.delete("/delete-account", authMiddleware, async (req, res, next) => {
  try {
    const data = await auth.api.deleteUser({
      headers: fromNodeHeaders(req.headers),
    });

    const cookie = data.headers?.get("set-cookie");

    if (cookie) {
      res.clearCookie(UID_COOKIE_NAME);
      res.append("Set-Cookie", cookie);
    }

    return res.json({
      success: true,
      msg: "Account deleted successfully",
    });
  } catch (err) {
    next(err);
  }
});

authRouter.post("/change-password", authMiddleware, async (req, res, next) => {
  try {
    const { newPassword } = req.body;

    await auth.api.changePassword({
      headers: fromNodeHeaders(req.headers),
      body: {
        newPassword,
        revokeOtherSessions: true, // optional
      },
    });

    return res.json({
      success: true,
      msg: "Password changed successfully",
    });
  } catch (err) {
    next(err);
  }
});

export { authRouter, betterAuthRouter };
