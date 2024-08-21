import * as z from "zod";

const RoleEnum = z.enum(["admin", "user"]);

export const updateProfileSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Your name must be at least 2 characters long",
    })
    .max(50)
    .optional(),
  email: z
    .string()
    .min(2, {
      message: "Admin email",
    })
    .max(50)
    .optional(),
  role: RoleEnum.optional(),
});
