import { z } from "zod";

export const register = z
  .object({
    name: z
      .string()
      .min(1, "Name must contain at least 1 letter")
      .max(150, "Name Overated"),
    email: z
      .email({
        pattern:
          /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_+\-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/i,
        error: "Failed, check your email again",
      })
      .min(1, "Email must filled")
      .max(255, "Email writter over maximum"),
    phone: z.string().min(1, "Must Filled").max(20, "Phone number overated"),
    passwordHash: z
      .string()
      .min(1, "Password must filled")
      .max(100, "Password overrated")
      .regex(/[A-Z]/, "Must contain at least 1 uppercase letter")
      .regex(/[a-z]/, "Must contain at least 1 lowercase letter")
      .regex(/[0-9]/, "Must contain at least 1 number"),
    confirmPassword: z
      .string()
      .min(2, "Password must filled")
      .max(100, "Password overrated")
      .regex(/[A-Z]/, "Must contain at least 1 uppercase letter")
      .regex(/[a-z]/, "Must contain at least 1 lowercase letter")
      .regex(/[0-9]/, "Must contain at least 1 number"),
  })
  .refine((data) => data.passwordHash === data.confirmPassword, {
    message: "One of them wrong",
    path: ["confirmPassword"],
  });

export type typeRegister = z.infer<typeof register>;
