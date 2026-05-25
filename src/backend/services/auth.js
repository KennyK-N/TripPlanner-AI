import { betterAuth } from "better-auth";
import { betterAuthConfig } from "../config/betterAuth.js";

export const auth = betterAuth(betterAuthConfig);

export default auth;
