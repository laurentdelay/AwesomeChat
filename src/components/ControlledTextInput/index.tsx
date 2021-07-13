import React, { useCallback } from "react";
import { useState } from "react";
import { ViewStyle } from "react-native";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
} from "react-native";
import { primaryColor } from "~/utils/colors";

interface ControlledTextInputProps<T> extends TextInputProps {
  name: keyof T;
  onInputChange: (name: keyof T, newValue: string) => void;
  label?: string;
}
function ControlledTextInput<FormValuesType extends Record<string, any>>({
  name,
  label,
  onInputChange,
  style,
  ...InputProps
}: ControlledTextInputProps<FormValuesType>) {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const toggleFocus = useCallback((_) => {
    setIsFocused((focused) => !focused);
  }, []);

  return (
    <View style={[inputStyles.container, style]}>
      {label && (
        <Text
          style={[
            inputStyles.label,
            {
              color: isFocused ? primaryColor : "black",
              fontWeight: isFocused ? "bold" : "normal",
            },
          ]}
        >
          {label}
        </Text>
      )}
      <TextInput
        onChangeText={(text) => onInputChange(name, text)}
        onFocus={toggleFocus}
        onBlur={toggleFocus}
        style={[
          inputStyles.input,
          {
            borderWidth: isFocused ? 2 : 1,
          },
        ]}
        {...InputProps}
        {...(InputProps.textContentType === "emailAddress" && {
          autoCapitalize: "none",
          keyboardType: "email-address",
        })}
      />
    </View>
  );
}

export default ControlledTextInput;

const inputStyles = StyleSheet.create({
  container: {
    height: 60,

    margin: 5,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  input: {
    flex: 1,
    padding: 4,
    margin: 0,
    width: "100%",
    borderColor: primaryColor,
    borderRadius: 5,
  },
  label: {
    fontSize: 14,
    paddingLeft: 3,
  },
});
