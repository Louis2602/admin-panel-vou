import { z } from "zod";

export const SignInSchema = z.object({
  username: z
    .string()
    .describe("Username")
    .min(1, "Username is required")
    .refine((value) => !/\s/.test(value), {
      message: "Username should not contain spaces",
    }),
  password: z.string().describe("Password").min(1, "Password is required"),
});
