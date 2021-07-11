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
  displayName: string;
  email: string;
  verifiedEmail: boolean;
} | null;

interface AuthState {
  user: User;
  isLoggedIn: boolean;
}

const initialAuthState = { user: null, isLoggedIn: false };

const AuthContext = createContext<AuthState>(initialAuthState);

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used in an AuthProvider");
  }

  return context;
};

function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User>(initialAuthState.user);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    initialAuthState.isLoggedIn
  );

  useEffect(() => {
    auth.useDeviceLanguage();

    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user === initialAuthState.user) {
        setCurrentUser(null);
        setIsLoggedIn(false);
      } else {
        setCurrentUser({
          displayName: user.displayName || "",
          email: user.email || "",
          verifiedEmail: user.emailVerified,
        });
        setIsLoggedIn(true);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user: currentUser, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
