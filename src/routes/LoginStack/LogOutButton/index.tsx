import React from "react";
import { StyleSheet } from "react-native";
import Link from "~/components/Link";
import { logout } from "~/utils/authFunctions";

const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {}
  };
  return <Link title="Logout" onPress={handleLogout} />;
};

export default LogoutButton;

const styles = StyleSheet.create({});
