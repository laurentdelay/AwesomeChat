import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import LoginNav from "./routes/LoginStack";
import AuthProvider from "./contexts/AuthContext";
import { KeyboardAvoidingView } from "react-native";

export default function App() {
  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={"padding"}>
      <AuthProvider>
        <NavigationContainer>
          <LoginNav />
        </NavigationContainer>
      </AuthProvider>
    </KeyboardAvoidingView>
  );
}
