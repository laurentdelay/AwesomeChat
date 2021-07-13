import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useAuth } from "~/contexts/AuthContext";
import { defaultProfilePic } from "~/images";
import { primaryColor } from "~/utils/colors";

const ProfileScreen = () => {
  const { user } = useAuth();
  return (
    <View style={profileStyles.profileContainer}>
      <View style={profileStyles.picContainer}>
        <Image
          source={user?.photoURL ? { uri: user?.photoURL } : defaultProfilePic}
          style={profileStyles.profilePic}
        />
      </View>
      <View style={profileStyles.profileInfo}>
        <Text style={profileStyles.profileHeader}>{user?.displayName}</Text>
        <Text style={profileStyles.profileHeader}>{user?.email}</Text>
      </View>
    </View>
  );
};

export default ProfileScreen;

const profileStyles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  picContainer: {
    width: 200,
    aspectRatio: 1 / 1,
    borderRadius: 1000,
    borderWidth: 2,
    backgroundColor: primaryColor,
    borderColor: primaryColor,
    overflow: "hidden",
  },
  profileInfo: { flex: 1 },
  profilePic: {
    width: "100%",
    height: "100%",
    shadowRadius: 15,
    shadowColor: "yellow",
    shadowOpacity: 1,
  },
  profileHeader: {},
});
