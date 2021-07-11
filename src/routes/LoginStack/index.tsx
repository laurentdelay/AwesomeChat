import React from "react";
import {
  createStackNavigator,
  StackNavigationOptions,
  StackNavigationProp,
} from "@react-navigation/stack";

import ResetPasswordScreen from "~/screens/ResetPassword";
import SignInScreen from "~/screens/SignIn";
import SignUpScreen from "~/screens/SignUp";
import { useAuth } from "~/contexts/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import MainNav from "../MainDrawer";
import {
  DrawerActions,
  getFocusedRouteNameFromRoute,
  RouteProp,
} from "@react-navigation/native";
import { TouchableOpacity } from "react-native";

export type LoginStackParamList = {
  "Sign In": undefined;
  "Sign Up": undefined;
  "Reset Password": undefined;
  Home: undefined;
};

const LoginStack = createStackNavigator<LoginStackParamList>();

const LoginNav = () => {
  const { isLoggedIn } = useAuth();

  const HomeOptions = ({
    route,
    navigation,
  }: {
    route: RouteProp<LoginStackParamList, "Home">;
    navigation: StackNavigationProp<LoginStackParamList, "Home">;
  }): StackNavigationOptions => ({
    headerTitle: getFocusedRouteNameFromRoute(route),
    headerLeft: () => (
      <TouchableOpacity
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      >
        <Ionicons name={"menu"} size={30} color={"#000"} />
      </TouchableOpacity>
    ),
  });

  return (
    <LoginStack.Navigator>
      {isLoggedIn ? (
        <LoginStack.Screen
          name="Home"
          component={MainNav}
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

export default LoginNav;
