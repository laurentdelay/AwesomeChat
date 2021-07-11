import React, { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

import ControlledTextInput from "~/components/ControlledTextInput";
import CustomButton from "~/components/CustomButton";
import CustomLink from "~/components/Link";

import { useForm } from "~/hooks/useForm";
import { LoginStackParamList } from "~/routes/LoginStack";
import { ResetPasswordInputs } from "~/utils/types/authTypes";
import { parseErrorMessage } from "~/utils/errorsFunctions";
import ErrorDisplay from "~/components/ErrorDisplay";
import { resetPassword } from "~/utils/authFunctions";

type ResetPasswordNavigationProp = StackNavigationProp<
  LoginStackParamList,
  "Reset Password"
>;

type ResetPasswordScreenProps = {
  navigation: ResetPasswordNavigationProp;
};

const ResetPasswordScreen = ({ navigation }: ResetPasswordScreenProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const { fields, updateValue } = useForm<ResetPasswordInputs>({
    defaultValues: { email: "" },
  });

  const handleSubmit = async () => {
    setIsLoading(true);
    setError("");

    try {
      await resetPassword(fields);
      navigation.navigate("Sign In");
    } catch (err) {
      setError(parseErrorMessage(err));
    }

    setIsLoading(false);
  };

  return (
    <View style={resetPasswordStyles.container}>
      <ControlledTextInput<ResetPasswordInputs>
        name="email"
        label={"Email"}
        onInputChange={updateValue}
        textContentType="emailAddress"
        value={fields.email}
        placeholder={"abc@mail.fr"}
        style={resetPasswordStyles.input}
      />

      <CustomButton
        onPress={handleSubmit}
        style={resetPasswordStyles.button}
        loading={isLoading}
      >
        Réinitialiser
      </CustomButton>
      {error !== "" && <ErrorDisplay errorMessage={error} />}
      <CustomLink
        title="Annuler"
        style={resetPasswordStyles.link}
        onPress={() => {
          navigation.navigate("Sign In");
        }}
      />
    </View>
  );
};

export default ResetPasswordScreen;

const resetPasswordStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: "10%",
  },
  input: { width: "100%" },
  button: { width: "100%", marginTop: 5 },
  link: { marginTop: 5 },
});
