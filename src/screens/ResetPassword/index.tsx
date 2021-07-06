import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

import ControlledTextInput from "~/components/ControlledTextInput";
import CustomButton from "~/components/CustomButton";
import CustomLink from "~/components/Link";

import useForm from "~/hooks/useForm";
import { LoginStackParamList } from "~/routes/LoginRoutes";
import { ResetPasswordInputs } from "~/utils/types/authTypes";

type ResetPasswordNavigationProp = StackNavigationProp<
  LoginStackParamList,
  "Reset Password"
>;

type ResetPasswordScreenProps = {
  navigation: ResetPasswordNavigationProp;
};

const ResetPasswordScreen = ({ navigation }: ResetPasswordScreenProps) => {
  const { fields, updateValue, handleSubmit } = useForm<ResetPasswordInputs>({
    defaultValues: { email: "" },
  });

  const onSubmit = useCallback((data) => {
    console.log(data);

    navigation.navigate("Sign In");
  }, []);

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
        onPress={(_) => {
          handleSubmit(onSubmit);
        }}
        style={resetPasswordStyles.button}
      >
        Réinitialiser
      </CustomButton>

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
    justifyContent: "flex-start",
    padding: "10%",
  },
  input: { width: "100%" },
  button: { width: "100%", marginTop: 5 },
  link: { marginTop: 5 },
});
