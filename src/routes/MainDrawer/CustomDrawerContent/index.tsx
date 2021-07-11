import {
  DrawerContentComponentProps,
  DrawerContentOptions,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import React from "react";
import { logout } from "~/utils/authFunctions";
import { alertColor } from "~/utils/colors";

const CustomDrawerContent = (
  props: DrawerContentComponentProps<DrawerContentOptions>
) => {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />

      <DrawerItem
        style={{ borderTopWidth: 1, borderRadius: 0 }}
        label="Logout"
        inactiveTintColor={alertColor.toString()}
        onPress={() => {
          logout();
        }}
      />
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
