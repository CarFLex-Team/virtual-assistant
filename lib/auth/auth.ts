import { betterAuth } from "better-auth";

import { db } from "../dbPool";

// import { sendResetPasswordEmail } from "../email";

export const auth = betterAuth({
  database: db,
  user: {
    additionalFields: {
      company: {
        type: "number",
        required: false,
        defaultValue: null,
        input: true, // allow user to set company
      },
    },
  },

  // Email & Password
  emailAndPassword: {
    enabled: true,

    // sendResetPassword: async ({ user, token }) => {
    //   return sendResetPasswordEmail(user, token);
    // },
  },

  // Email Verification
  //   emailVerification: {
  //     sendVerificationEmail: async ({ user, url }) => {
  //       // Example with Resend:
  //       // await resend.emails.send({
  //       //   from: "no-reply@yourdomain.com",
  //       //   to: user.email,
  //       //   subject: "Verify your email",
  //       //   html: `<a href="${url}">Verify email</a>`,
  //       // })
  //       console.log(`Verification link for ${user.email}: ${url}`);
  //     },
  //   },

  // Social Providers
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },

  // Session
  session: {
    expiresIn: 60 * 60 * 24 * 30, // 30 days
    updateAge: 60 * 60 * 24, // Refresh every 24h
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 min client-side cache
    },
  },

  // Trusted origins (add your production domain)
  trustedOrigins: [
    "http://localhost:3000",
    process.env.NEXT_PUBLIC_APP_URL ?? "",
  ],
});

export type Session = typeof auth.$Infer.Session;
