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
    <View style={style}>
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
      />
    </View>
  );
}

export default ControlledTextInput;

const inputStyles = StyleSheet.create({
  input: {
    height: 45,
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
