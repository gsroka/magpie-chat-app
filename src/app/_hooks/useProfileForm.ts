"use client";

import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { useAuth } from "@/app/_context/AuthContext";

/**
 * Manages the logic for the profile form.
 */
export function useProfileForm() {
  const { user, updateUser } = useAuth();
  const [name, setName] = useState(user?.name ?? "");

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      updateUser({ name: name.trim() });
      toast.success("Profile saved successfully!");
    } else {
      toast.error("Name cannot be empty");
    }
  };

  return {
    name,
    email: user?.email ?? "",
    setName,
    handleSave,
  };
}
