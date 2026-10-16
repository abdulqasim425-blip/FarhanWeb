import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("authUser");
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {}
    }
    return null;
  });

  const [users, setUsers] = useState(() => {
    const stored = localStorage.getItem("authUsers");
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {}
    }
    return [];
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("authUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("authUser");
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem("authUsers", JSON.stringify(users));
  }, [users]);

  const signup = (name, email, password) => {
    const exists = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase(),
    );
    if (exists) {
      return { ok: false, error: "An account with this email already exists." };
    }
    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      createdAt: new Date().toISOString(),
    };
    setUsers([...users, newUser]);
    setUser({ id: newUser.id, name: newUser.name, email: newUser.email });
    return { ok: true };
  };

  const login = (email, password) => {
    const found = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase(),
    );
    if (!found) {
      return { ok: false, error: "no-account" };
    }
    if (found.password !== password) {
      return { ok: false, error: "Invalid password." };
    }
    setUser({ id: found.id, name: found.name, email: found.email });
    return { ok: true };
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, users, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
