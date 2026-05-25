import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import { prisma } from "#backend/services/prisma-client.js";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5000/"], // Replace with frontend's origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed HTTP methods
    credentials: true,
  }),
);

app.use(cookieParser());

// (async () => {
//   const users = await prisma.user.findMany();
//   console.log(users);
// })();

// app.get("/users", async (req, res) => {
//   try {
//     const users = await prisma.user.findMany();
//     res.json(users);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: err.message });
//   }
// });

import { auth } from "#backend/services/auth.js";
import { toNodeHandler, fromNodeHeaders } from "better-auth/node";

console.log(process.env.AUTH_SECRET);
console.log(process.env.BETTER_AUTH_URL);

app.use(express.json());

app.get("/me", async (req, res) => {
  try {
    console.log(req.cookies["better-auth.session_token"]);
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    res.json(session);
  } catch (err) {
    console.error("SESSION ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

app.post("/test-signup", async (req, res) => {
  try {
    const data = await auth.api.signUpEmail({
      body: {
        name: "John Doe",
        email: "john.doe@example.com",
        password: "password1234",
        image: "https://example.com/image.png",
        callbackURL: "http://localhost:5000/api/auth/ok",
      },
    });

    res.json(data);
  } catch (err) {
    console.error("SIGNUP ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

app.post("/test-login", async (req, res) => {
  try {
    if (req.cookies["better-auth.session_token"]) {
      return res.json({
        AlreadyLogin: true,
      });
    }

    const data = await auth.api.signInEmail({
      headers: fromNodeHeaders(req.headers),
      returnHeaders: true,
      body: {
        email: "john.doe@example.com",
        password: "password1234",
      },
    });

    var cookie = data.headers.get("set-cookie");
    console.log(cookie);

    if (cookie) {
      res.setHeader("set-cookie", cookie);
    }

    res.json(data.response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/test-sign-out", async (req, res) => {
  try {
    const data = await auth.api.signOut({
      returnHeaders: true,
      headers: fromNodeHeaders(req.headers),
    });

    var cookie = data.headers.get("set-cookie");

    console.log(cookie);

    if (cookie) {
      res.setHeader("set-cookie", cookie);
    }

    return res.json({
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

app.listen(5000, () => {
  console.log(`Server running on port 5000 with ${process.env.NODE_ENV}`);
});

// TODO: WILL NEED TO HANDLE STALE LOGIN, i.E IF NOT IN the SESSION DB TABLE CLEAR THE COOKIE CUZ ITS STALE
// TODO: add sanitizaiton later
