import React, { ReactNode, useMemo } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";

import themeColors, { ColorsName } from "~/utils/colors";

interface CustomButtonProps extends TouchableOpacityProps {
  children: ReactNode;
  color?: ColorsName;
  preset?: "full" | "outlined";
}

const CustomButton = ({
  children,
  color = "primary",
  preset = "full",
  style,
  ...rest
}: CustomButtonProps) => {
  const colorFromTheme = themeColors[color];

  return (
    <View style={[style]}>
      <TouchableOpacity
        {...rest}
        style={[
          customButtonStyles.button,
          {
            backgroundColor: preset === "full" ? colorFromTheme : "none",
            borderColor: colorFromTheme,
          },
        ]}
      >
        <Text
          style={[
            customButtonStyles.buttonText,
            { color: preset === "full" ? "#fff" : colorFromTheme },
          ]}
        >
          {children}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;

const customButtonStyles = StyleSheet.create({
  button: {
    elevation: 2,
    borderRadius: 8,
    borderWidth: 3,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
  },
});
