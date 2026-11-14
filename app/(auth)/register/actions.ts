"use server";

import { registration } from "@/lib/validations/register";
import { db } from "@/src/prisma/db";
import { hashPassword } from "@/lib/hash";

function isPostgresError(
  error: unknown,
): error is { code: string; detail?: string; constraint?: string } {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    typeof (error as Record<string, unknown>).code === "string"
  );
}

export async function submitRegister(data: unknown) {
  const result = registration.safeParse(data);

  if (!result.success)
    return {
      success: false,
      message: "Wrong selection",
      error: "Invalid data",
    };

  const { email, passwordHash } = result.data;

  try {
    const user = await db.orm.public.User.where({ email }).first();

    if (user) {
      return {
        success: false,
        message: "The email is alredy use by another user",
      };
    }

    const hashedPassword = await hashPassword(passwordHash);
    const normalizedEmail = email.toLocaleLowerCase().trim();

    await db.orm.public.User.create({
      email: normalizedEmail,
      passwordHash: hashedPassword,
    });

    return {
      success: true,
      message: "Register successfully",
    };
  } catch (error) {
    if (isPostgresError(error)) {
      if (error.code === "23505") {
        return {
          success: false,
          message: "Email was exist",
        };
      }
      if (error.code === "23503") {
        return {
          success: false,
          message: "Data refrensi invalid",
        };
      }
    }
    console.error("Database error", error);
    return {
      success: false,
      message: "There is problem in server",
    };
  }
}
