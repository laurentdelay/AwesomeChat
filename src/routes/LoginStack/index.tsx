import React from "react";
import {
  createStackNavigator,
  StackNavigationOptions,
  StackNavigationProp,
} from "@react-navigation/stack";

import HomeScreen from "~/screens/Home";
import ResetPasswordScreen from "~/screens/ResetPassword";
import SignInScreen from "~/screens/SignIn";
import SignUpScreen from "~/screens/SignUp";
import { useAuth } from "~/contexts/AuthContext";
import { logout } from "~/utils/authFunctions";
import LogoutButton from "./LogOutButton";

export type LoginStackParamList = {
  "Sign In": undefined;
  "Sign Up": undefined;
  "Reset Password": undefined;
  Home: undefined;
};

const LoginStack = createStackNavigator<LoginStackParamList>();

const LoginRoutes = () => {
  const { isLoggedIn } = useAuth();

  const HomeOptions = (): StackNavigationOptions => ({
    headerTitle: "Awesome Chat",
    headerRight: () => <LogoutButton />,
  });

  return (
    <LoginStack.Navigator>
      {isLoggedIn ? (
        <LoginStack.Screen
          name="Home"
          component={HomeScreen}
          options={HomeOptions}
        />
      ) : (
        <>
          <LoginStack.Screen name="Sign In" component={SignInScreen} />
          <LoginStack.Screen name="Sign Up" component={SignUpScreen} />
          <LoginStack.Screen
            name="Reset Password"
            component={ResetPasswordScreen}
          />
        </>
      )}
    </LoginStack.Navigator>
  );
};

export default LoginRoutes;
