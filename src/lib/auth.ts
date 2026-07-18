import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { admin } from "better-auth/plugins";
import { hashPassword, verifyPassword } from "./argon2";
import prisma from "./database/dbClient";
import { serverEnv } from "./env/serverEnv";

export const auth = betterAuth({
  secret: serverEnv.BETTER_AUTH_SECRET,

  baseURL: serverEnv.BETTER_AUTH_URL,

  database: prismaAdapter(prisma, {
    provider: "sqlite", // or "mysql", "postgresql", ...etc
  }),

  plugins: [nextCookies(), admin()],

  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    password: {
      hash: hashPassword,
      verify: verifyPassword,
    },
  },

  socialProviders: {
    google: {
      clientId: serverEnv.GOOGLE_CLIENT_ID,
      clientSecret: serverEnv.GOOGLE_CLIENT_SECRET,
    },

    facebook: {
      clientId: serverEnv.FACEBOOK_CLIENT_ID,
      clientSecret: serverEnv.FACEBOOK_CLIENT_SECRET,
    },
  },

  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutes
    },

    rateLimit: {
      window: 60, // Default: 1 minute
      max: 25, // Default: 25 requests per minute (increased from 10)

      advanced: {
        cookiePrefix: "pixslash",
        useSecureCookies: process.env.NODE_ENV === "production",
        database: {
          generateId: false,
        },
      },

      customRules: {
        "/sign-in/*": {
          window: 300, // 5 minutes
          max: 10, // 10 login attempts
        },
        "/sign-up/*": {
          window: 600, // 10 minutes
          max: 5, // 5 registration attempts
        },
        "/change-password/*": {
          window: 300, // 5 minutes
          max: 5, // 5 password change attempts
        },
        "/get-session": {
          window: 60,
          max: 60, // Allow frequent session checks
        },
      },
    },
  },
});
