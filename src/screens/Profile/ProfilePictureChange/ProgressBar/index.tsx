import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { primaryColor } from "~/utils/colors";

type ProgressBarProps = {
  progress: number;
};

const ProgressBar = ({ progress }: ProgressBarProps) => {
  const barAnimation = useRef(new Animated.Value(0));

  const barProgress = barAnimation.current.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
    extrapolate: "clamp",
  });

  useEffect(() => {
    Animated.timing(barAnimation.current, {
      toValue: progress,
      duration: 100,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  return (
    <>
      <View style={PictureChangeStyle.loadingBar}>
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: primaryColor, width: barProgress },
          ]}
        ></Animated.View>
      </View>
      <Text>{`${progress}%`}</Text>
    </>
  );
};

export default ProgressBar;

const PictureChangeStyle = StyleSheet.create({
  loadingBar: {
    borderWidth: 1,
    height: 15,
    width: "80%",
    borderRadius: 5,
  },
});
