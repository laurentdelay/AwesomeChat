import React, { useEffect } from "react";
import { useState, createContext, ReactNode, useContext } from "react";
import { auth, User } from "~/utils/firebase";

interface AuthState {
  user: User;
  isLoggedIn: boolean;
}

const initialAuthState: AuthState = {
  user: null,
  isLoggedIn: false,
};

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
    auth.languageCode = "fr";

    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user === null) {
        setCurrentUser(null);
        setIsLoggedIn(false);
        return;
      }

      setCurrentUser(user);
      setIsLoggedIn(true);
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
