"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/_context/AuthContext";

/**
 * Manages the logic for the login form.
 * @returns An object with state and handlers for the login page.
 */
export function useLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login, user, isInitialized } = useAuth();
  const router = useRouter();

  // Redirect the user if they are already logged in
  useEffect(() => {
    if (isInitialized && user) {
      router.push("/chat");
    }
  }, [user, isInitialized, router]);

  /**
   * Handles the form submission for logging in.
   */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      await login(email, password);
    } catch (error) {
      setError("Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    isLoading,
    isAuthenticating: !isInitialized || !!user,
    handleLogin,
  };
}
