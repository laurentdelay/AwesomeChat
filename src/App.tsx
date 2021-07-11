import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import LoginRoutes from "./routes/LoginStack";
import AuthProvider from "./contexts/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <LoginRoutes />
      </NavigationContainer>
    </AuthProvider>
  );
}
