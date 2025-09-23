"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { loginAction, logoutAction, getSession } from "@/app/_actions/auth";
import type { User } from "@/app/_types";

/**
 * Defines the shape of the authentication context.
 * This includes the current user, loading state, and action functions.
 */
interface AuthContextType {
  user: User | null;
  isInitialized: boolean;
  updateUser: (userData: Partial<User>) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

/**
 * React context for managing application-wide authentication state.
 */
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

/**
 * Custom hook for accessing the authentication context.
 * Provides a clean and safe way to consume auth state and actions.
 * Throws an error if used outside an AuthProvider.
 * @returns {AuthContextType} The authentication context.
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

/**
 * Provider component that wraps the application and provides authentication state.
 * @param {object} props - The component props.
 * @param {ReactNode} props.children - The child components to render.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isInitialized, setInitialized] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    void (async () => {
      try {
        const { user } = await getSession();
        if (user) {
          const storedProfile = localStorage.getItem("user-profile");
          if (storedProfile) {
            const profile = JSON.parse(storedProfile) as Partial<User>;
            setUser({ ...user, ...profile, email: user.email });
          } else {
            setUser({ ...user, avatarUrl: "https://github.com/shadcn.png" });
          }
        }
      } catch (error) {
        console.error("Failed to get session:", error);
      } finally {
        setInitialized(true);
      }
    })();
  }, []);

  const updateUser = (userData: Partial<User>) => {
    setUser((prevUser) => {
      if (!prevUser) return null;
      const newUser = { ...prevUser, ...userData };
      localStorage.setItem("user-profile", JSON.stringify({
        name: newUser.name,
        avatarUrl: newUser.avatarUrl
      }));
      return newUser;
    });
  };
  const login = async (email: string, password: string): Promise<void> => {
    const result = await loginAction(email, password);
    if (result.success && result.user) {
      const userData: User = {
        ...result.user,
        avatarUrl: "https://github.com/shadcn.png",
      };
      setUser(userData);
      router.push("/chat");
    } else {
      throw new Error(result.error ?? "Login failed");
    }
  };

  const logout = async () => {
    await logoutAction();
    setUser(null);
    localStorage.removeItem("user-profile");
    router.push("/login");
  };

  const value = { user, isInitialized, login, logout, updateUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
