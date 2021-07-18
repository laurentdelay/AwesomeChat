import React from "react";
import { StyleSheet, View, Image } from "react-native";
import {
  CacheManager,
  Image as CachedImage,
} from "react-native-expo-image-cache";
import { defaultProfilePic } from "~/images";
import { primaryColor } from "~/utils/colors";

type ProfilePicProps = {
  picUri?: string | null;
  hasChanged?: boolean;
};

const ProfilePic = ({ picUri = null, hasChanged = false }: ProfilePicProps) => {
  const path = CacheManager;

  if (picUri === null || hasChanged) {
    return (
      <View style={picStyles.picContainer}>
        <Image
          source={picUri === null ? defaultProfilePic : { uri: picUri }}
          style={picStyles.profilePic}
        />
      </View>
    );
  }

  return (
    <View style={picStyles.picContainer}>
      <CachedImage style={picStyles.profilePic} {...{ uri: picUri }} />
    </View>
  );
};

export default ProfilePic;

const picStyles = StyleSheet.create({
  picContainer: {
    width: 200,
    aspectRatio: 1 / 1,
    borderRadius: 1000,
    borderWidth: 2,
    backgroundColor: primaryColor,
    borderColor: primaryColor,
    overflow: "hidden",
  },
  profilePic: {
    width: "100%",
    height: "100%",
    shadowRadius: 15,
    shadowColor: "yellow",
    shadowOpacity: 1,
  },
});
