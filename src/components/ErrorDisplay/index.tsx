import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { alertColor } from "~/utils/colors";

type ErrorDisplayProps = {
  errorMessage: string;
};

const ErrorDisplay = ({ errorMessage }: ErrorDisplayProps) => {
  return (
    <View style={errorStyles.errorContainer}>
      <Text style={errorStyles.errorText}>{errorMessage}</Text>
    </View>
  );
};

export default ErrorDisplay;

const errorStyles = StyleSheet.create({
  errorContainer: {
    alignItems: "center",
    justifyContent: "center",

    width: "100%",
    height: 40,
    marginTop: 8,

    borderColor: alertColor,
    borderWidth: 2,
    borderRadius: 5,

    backgroundColor: "rgba(255,0,0, 0.2)",
  },
  errorText: {
    color: alertColor,
    fontWeight: "500",
  },
});
