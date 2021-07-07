import React, { ReactNode, useMemo } from "react";
import {
  ActivityIndicator,
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
  loading?: boolean;
}

const CustomButton = ({
  children,
  color = "primary",
  preset = "full",
  style,
  loading = false,
  ...rest
}: CustomButtonProps) => {
  const colorFromTheme = themeColors[color];

  const textColor = preset === "full" ? "#fff" : colorFromTheme;
  const buttonContent = loading ? (
    <ActivityIndicator color={textColor} />
  ) : (
    <Text style={[customButtonStyles.buttonText, { color: textColor }]}>
      {children}
    </Text>
  );

  return (
    <View style={[style]}>
      <TouchableOpacity
        disabled={loading}
        {...rest}
        style={[
          customButtonStyles.button,
          {
            backgroundColor: preset === "full" ? colorFromTheme : "none",
            borderColor: colorFromTheme,
            opacity: loading ? 0.2 : 1,
          },
        ]}
      >
        {buttonContent}
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
