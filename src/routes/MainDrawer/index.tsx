import { createDrawerNavigator } from "@react-navigation/drawer";

import React from "react";
import { StyleSheet } from "react-native";
import NotVerifiedWarning from "~/components/NotVerifiedWarning";
import { useAuth } from "~/contexts/AuthContext";
import ChatScreen from "~/screens/Chat";
import HomeScreen from "~/screens/Home";
import ProfileScreen from "~/screens/Profile";
import CustomDrawerContent from "./CustomDrawerContent";

type MainDrawerParamList = {
  Chat: undefined;
  Home: undefined;
  Profile: undefined;
};

const MainDrawer = createDrawerNavigator<MainDrawerParamList>();

const MainNav = () => {
  const { user } = useAuth();
  return (
    <>
      {!user?.emailVerified && <NotVerifiedWarning />}
      <MainDrawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <MainDrawer.Screen name="Profile" component={ProfileScreen} />
        <MainDrawer.Screen name="Chat" component={ChatScreen} />
        <MainDrawer.Screen name="Home" component={HomeScreen} />
      </MainDrawer.Navigator>
    </>
  );
};

export default MainNav;

const styles = StyleSheet.create({});
