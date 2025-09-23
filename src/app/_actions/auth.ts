"use server";

import { cookies } from "next/headers";

const VALID_EMAIL = "test@example.com";
const VALID_PASSWORD = "password123";

/**
 * Login action.
 * @param email
 * @param password
 */
export async function loginAction(email: string, password: string) {
  if (email === VALID_EMAIL && password === VALID_PASSWORD) {
    const cookieStore = await cookies();
    cookieStore.set("session", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return { success: true, user: { name: "Test User", email: VALID_EMAIL } };
  }

  return { success: false, error: "Invalid credentials" };
}

/**
 * Logout action.
 */
export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
  return { success: true };
}

/**
 * Get session action.
 */
export async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session");
  if (session?.value === "authenticated") {
    return { user: { name: "Test User", email: VALID_EMAIL } };
  }
  return { user: null };
}
