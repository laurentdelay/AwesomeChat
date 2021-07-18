import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { Image as CachedImage } from "react-native-expo-image-cache";
import { defaultProfilePic } from "~/images";
import { primaryColor } from "~/utils/colors";

type ProfilePicProps = {
  picUri?: string | null;
  hasChanged?: boolean;
  width?: number;
};

const ProfilePic = ({
  picUri = null,
  hasChanged = false,
  width = 150,
}: ProfilePicProps) => {
  const image =
    picUri === null || hasChanged ? (
      <Image
        source={picUri === null ? defaultProfilePic : { uri: picUri }}
        style={picStyles.profilePic}
      />
    ) : (
      <CachedImage style={picStyles.profilePic} {...{ uri: picUri }} />
    );

  return <View style={[picStyles.picContainer, { width }]}>{image}</View>;
};

export default ProfilePic;

const picStyles = StyleSheet.create({
  picContainer: {
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
