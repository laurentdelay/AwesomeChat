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
  children: ReactNode | string;
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

  const buttonContent =
    typeof children === "string" ? (
      <Text style={[customButtonStyles.buttonText, { color: textColor }]}>
        {children}
      </Text>
    ) : (
      <>{children}</>
    );

  const buttonDisplay = loading ? (
    <ActivityIndicator color={textColor} />
  ) : (
    buttonContent
  );

  return (
    <View style={[customButtonStyles.container, style]}>
      <TouchableOpacity
        disabled={loading}
        {...rest}
        style={[
          customButtonStyles.button,
          {
            backgroundColor: preset === "full" ? colorFromTheme : "transparent",
            borderColor: colorFromTheme,
            opacity: loading ? 0.2 : 1,
          },
        ]}
      >
        {buttonDisplay}
      </TouchableOpacity>
    </View>
  );
};

export default CustomButton;

const customButtonStyles = StyleSheet.create({
  container: { height: 45, margin: 5 },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    borderRadius: 8,
    borderWidth: 3,
    paddingVertical: 10,
    paddingHorizontal: 12,
    height: "100%",
    width: "100%",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
  },
});
