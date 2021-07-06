import React, { useEffect } from "react";
import { useState } from "react";
import { createContext, ReactNode, useContext, useReducer } from "react";
import { auth } from "~/utils/firebase";

/**
 *
 * Définition du context
 *
 */

export type User = {
  email?: string;
} | null;

interface AuthState {
  user: User;
}

const initialAuthState = { user: null };

const AuthContext = createContext<AuthState>(initialAuthState);

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used in an AuthProvider");
  }

  return context;
};

/**
 *
 * Définition du reducer
 *
 */

function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User>(null);

  useEffect(() => {
    auth.useDeviceLanguage();

    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setCurrentUser(user as User);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user: currentUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
