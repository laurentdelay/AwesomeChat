import React, { ReactNode } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import themeColors, { ColorsName } from "~/utils/colors";

interface LinkProps extends TouchableOpacityProps {
  title: string;
  color?: ColorsName;
}

const CustomLink = ({
  title,
  style,
  color = "primary",
  ...restTouchProps
}: LinkProps) => {
  const colorFromTheme = themeColors[color];

  return (
    <View style={style}>
      <TouchableOpacity style={linkStyles.linkButton} {...restTouchProps}>
        <Text style={[linkStyles.linkText, { color: colorFromTheme }]}>
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomLink;

const linkStyles = StyleSheet.create({
  linkButton: {},
  linkText: {},
});
