import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAuth } from "~/contexts/AuthContext";

const HomeScreen = () => {
  const { user } = useAuth();

  return (
    <View>
      <Text>Welcome Home {user?.email}</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
