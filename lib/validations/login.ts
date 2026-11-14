import { z } from "zod";

export const login = z.object({
  email: z
    .email({
      pattern:
        /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_+\-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/i,
      error: "Failed, check your email again",
    })
    .min(1, "Email Must Filled")
    .max(255, "Email writter over maximum")
    .toLowerCase()
    .trim(),
  password: z
    .string()
    .min(1, "Password Must Filled")
    .max(100, "Password overated")
    .trim(),
});

export type loginSchema = z.infer<typeof login>;
