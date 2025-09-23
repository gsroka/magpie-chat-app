"use client";

import { useAuth } from "@/app/_context/AuthContext";
import { useLocalStorageState } from "@/app/_hooks/useLocalStorageState";
import type { User } from "@/app/_types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

/**
 * A form for viewing and editing user profile information.
 * Changes are persisted to localStorage.
 */
export function ProfileForm() {
  const { user, updateUser } = useAuth();
  const [profile, setProfile] = useLocalStorageState<Partial<User>>(
    "user-profile",
    { name: user?.name, email: user?.email },
  );

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser(profile);
    toast("Profile saved!");
  };

  return (
    <Card className="max-w-xl">
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>
          Manage your account settings. Changes are saved locally.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={profile.name ?? ""}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={profile.email ?? ""}
              readOnly
              disabled
            />
          </div>
          <Button type="submit">Save Changes</Button>
        </form>
      </CardContent>
    </Card>
  );
}
