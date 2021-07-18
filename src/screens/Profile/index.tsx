import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import ProfilePic from "~/components/ProfilePic";
import { useAuth } from "~/contexts/AuthContext";
import { primaryColor } from "~/utils/colors";
import DisplayNameChange from "./DisplayNameChange";
import ProfilePictureChange from "./ProfilePictureChange";
import { profileStyles } from "./profileStyles";

const ProfileScreen = () => {
  const [displayNameModalVisible, setDisplayNameModalVisible] =
    useState<boolean>(false);
  const [pictureModalVisible, setPictureModalVisible] =
    useState<boolean>(false);
  const { user } = useAuth();

  const handleModalOpen = (target: "displayName" | "pic") => {
    handleClose();

    switch (target) {
      case "displayName":
        setDisplayNameModalVisible(true);
        return;
      case "pic":
        setPictureModalVisible(true);
    }
  };

  const handleClose = () => {
    setPictureModalVisible(false);
    setDisplayNameModalVisible(false);
  };

  return (
    <View style={profileStyles.profileContainer}>
      {displayNameModalVisible && (
        <DisplayNameChange handleClose={handleClose} />
      )}

      {pictureModalVisible && (
        <ProfilePictureChange handleClose={handleClose} />
      )}

      <ProfilePic picUri={user?.photoURL} width={250} />
      <View style={profileStyles.profileItem}>
        <TouchableOpacity
          style={profileStyles.profileItem}
          onPress={() => handleModalOpen("pic")}
        >
          <Text style={[profileStyles.profileDetail, { color: primaryColor }]}>
            Modifier avatar
          </Text>
          <FontAwesome
            name="pencil-square-o"
            size={18}
            color={primaryColor}
            style={profileStyles.modifyButton}
          />
        </TouchableOpacity>
      </View>
      <View style={profileStyles.profileInfo}>
        <View style={profileStyles.profileItem}>
          <Text style={profileStyles.profileHeader}>{user?.displayName}</Text>
          <TouchableOpacity
            style={profileStyles.modifyButton}
            onPress={() => handleModalOpen("displayName")}
          >
            <FontAwesome
              name="pencil-square-o"
              size={18}
              color={primaryColor}
            />
          </TouchableOpacity>
        </View>
        <View style={profileStyles.profileItem}>
          <Text style={profileStyles.profileDetail}>{user?.email}</Text>
        </View>
      </View>
    </View>
  );
};

export default ProfileScreen;
