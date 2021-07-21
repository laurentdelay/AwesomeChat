import { createDrawerNavigator } from "@react-navigation/drawer";

import React from "react";
import { StyleSheet } from "react-native";
import ChatUsersProvider from "~/contexts/ChatUsersContext";
import ChatScreen from "~/screens/Chat";
import ProfileScreen from "~/screens/Profile";
import CustomDrawerContent from "./CustomDrawerContent";

type MainDrawerParamList = {
  Chat: undefined;
  Home: undefined;
  Profile: undefined;
};

const MainDrawer = createDrawerNavigator<MainDrawerParamList>();

const MainNav = () => {
  return (
    <ChatUsersProvider>
      <MainDrawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <MainDrawer.Screen name="Chat" component={ChatScreen} />
        <MainDrawer.Screen name="Profile" component={ProfileScreen} />
      </MainDrawer.Navigator>
    </ChatUsersProvider>
  );
};

export default MainNav;

const styles = StyleSheet.create({});
