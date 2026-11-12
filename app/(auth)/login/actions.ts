"use server";

import { login } from "@/lib/validations/login";
import { db } from "@/src/prisma/db";
import bcrypt from "bcryptjs";

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

export async function submitLogin(data: unknown) {
  const result = login.safeParse(data);

  if (!result.success)
    return { success: false, message: "Input invalid", error: "Invalid data" };

  const { email, password } = result.data;

  try {
    const user = await db.orm.public.User.where({ email }).first();

    if (!user || !user.passwordHash) {
      return { success: false, message: "Email or password wrong" };
    }

    const isPasswordMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordMatch) {
      return { success: false, message: "Email or password invalid" };
    }

    return {
      success: true,
      message: "Login Berhasil",
      user: {
        id: user.id,
        email: user.email,
      },
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
          message: "Data referensi invalid",
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

// 23505 email atau username duplika
// 23503 referensi ID tidak ditemukan
// 23502: Not-null violation (kolom wajib diisi tapi kosong).
// 22P02: Invalid text representation (format UUID/tipe data tidak valid).
