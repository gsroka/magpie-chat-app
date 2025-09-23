"use client";

import { useState, useEffect, type FormEvent } from "react";
import { toast } from "sonner";
import { useAuth } from "@/app/_context/AuthContext";
import { useLocalStorageState } from "@/app/_hooks/useLocalStorageState";
import type { User } from "@/app/_types";

/**
 * Manages the state and logic for the user profile form.
 * @returns An object with profile data, an input handler, and a save handler.
 */
export function useProfileForm() {
  const { user, updateUser } = useAuth();
  const [storedProfile, setStoredProfile] = useLocalStorageState<Partial<User>>(
    "user-profile",
    { name: user?.name, email: user?.email },
  );

  const [name, setName] = useState(storedProfile.name ?? "");

  // Sync local state if the user context changes
  useEffect(() => {
    setName(storedProfile.name ?? user?.name ?? "");
  }, [storedProfile.name, user?.name]);

  /**
   * Handles form submission, updates the user context and local storage,
   * and displays a notification.
   */
  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    const updatedProfile = { ...storedProfile, name };
    setStoredProfile(updatedProfile);
    updateUser(updatedProfile);
    toast.success("Profile saved successfully!");
  };

  return {
    name,
    email: user?.email ?? "",
    setName,
    handleSave,
  };
}