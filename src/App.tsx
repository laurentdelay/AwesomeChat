import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import LoginRoutes from "./routes/LoginRoutes";

export default function App() {
  return (
    <NavigationContainer>
      <LoginRoutes />
    </NavigationContainer>
  );
}
