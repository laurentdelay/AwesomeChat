import { createDrawerNavigator } from "@react-navigation/drawer";

import React from "react";
import { StyleSheet } from "react-native";
import ChatScreen from "~/screens/Chat";
import HomeScreen from "~/screens/Home";
import CustomDrawerContent from "./CustomDrawerContent";

type MainDrawerParamList = {
  Chat: undefined;
  Home: undefined;
  Profile: undefined;
};

const MainDrawer = createDrawerNavigator<MainDrawerParamList>();

const MainNav = () => {
  return (
    <MainDrawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <MainDrawer.Screen name="Chat" component={ChatScreen} />
      <MainDrawer.Screen name="Home" component={HomeScreen} />
      <MainDrawer.Screen name="Profile" component={HomeScreen} />
    </MainDrawer.Navigator>
  );
};

export default MainNav;

const styles = StyleSheet.create({});
