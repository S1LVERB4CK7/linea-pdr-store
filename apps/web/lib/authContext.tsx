"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: "customer" | "distributor" | "admin";
}

interface AuthContextValue {
  user: AuthUser | null;
  accessToken: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, country: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

async function parseApiError(res: Response): Promise<string> {
  try {
    const body = await res.json();
    return body?.message ?? body?.error ?? "Something went wrong. Please try again.";
  } catch {
    return "Something went wrong. Please try again.";
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("linea:user");
    const storedToken = localStorage.getItem("linea:accessToken");
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setAccessToken(storedToken);
    }
    setIsLoading(false);
  }, []);

  function persist(nextUser: AuthUser, nextAccessToken: string, refreshToken: string) {
    localStorage.setItem("linea:user", JSON.stringify(nextUser));
    localStorage.setItem("linea:accessToken", nextAccessToken);
    localStorage.setItem("linea:refreshToken", refreshToken);
    setUser(nextUser);
    setAccessToken(nextAccessToken);
  }

  async function login(email: string, password: string) {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error(await parseApiError(res));
    const data = await res.json();
    persist(data.user, data.accessToken, data.refreshToken);
  }

  async function register(name: string, email: string, password: string, country: string) {
    const res = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, country }),
    });
    if (!res.ok) throw new Error(await parseApiError(res));
    const data = await res.json();
    persist(data.user, data.accessToken, data.refreshToken);
  }

  function logout() {
    localStorage.removeItem("linea:user");
    localStorage.removeItem("linea:accessToken");
    localStorage.removeItem("linea:refreshToken");
    setUser(null);
    setAccessToken(null);
  }

  return (
    <AuthContext.Provider value={{ user, accessToken, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
