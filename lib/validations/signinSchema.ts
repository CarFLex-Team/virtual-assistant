import { z } from "zod";

export const signinSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .toLowerCase()
    .refine((email) => email.includes("@"), "Invalid email format"),
  password: z
    .string()
    .min(1, "Password is required")
    .max(100, "Password must be less than 100 characters"),
});

export type SigninFormData = z.infer<typeof signinSchema>;
