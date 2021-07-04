import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "~/screens/Home";
import ResetPasswordScreen from "~/screens/ResetPassword";
import SignInScreen from "~/screens/SignIn";
import SignUpScreen from "~/screens/SignUp";

export type LoginStackParamList = {
  "Sign In": undefined;
  "Sign Up": undefined;
  "Reset Password": undefined;
  Home: undefined;
};

const LoginStack = createStackNavigator<LoginStackParamList>();

const LoginRoutes = () => {
  return (
    <LoginStack.Navigator>
      <LoginStack.Screen name="Sign In" component={SignInScreen} />
      <LoginStack.Screen name="Sign Up" component={SignUpScreen} />
      <LoginStack.Screen
        name="Reset Password"
        component={ResetPasswordScreen}
      />
      <LoginStack.Screen name="Home" component={HomeScreen} />
    </LoginStack.Navigator>
  );
};

export default LoginRoutes;
