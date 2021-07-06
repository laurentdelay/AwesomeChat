import React, { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

import useForm from "~/hooks/useForm";
import { LoginStackParamList } from "~/routes/LoginRoutes";
import ControlledTextInput from "~/components/ControlledTextInput";
import CustomButton from "~/components/CustomButton";
import CustomLink from "~/components/Link";
import { SignUpInputs } from "~/utils/types/authTypes";
import { register } from "~/utils/authFunctions";

type SignUpNavigationProp = StackNavigationProp<LoginStackParamList, "Sign Up">;

type SignUpScreenProps = {
  navigation: SignUpNavigationProp;
};

const SignUpScreen = ({ navigation }: SignUpScreenProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { fields, updateValue } = useForm<SignUpInputs>({
    defaultValues: { email: "", password: "", confirmPassword: "" },
  });

  const handleSubmit = async () => {
    try {
      await register(fields);
    } catch (error) {
      console.log("SignUpError", error.code);
    }
  };

  return (
    <View style={[signUpStyles.container]}>
      <ControlledTextInput<SignUpInputs>
        name="email"
        label={"Email"}
        onInputChange={updateValue}
        textContentType="emailAddress"
        value={fields.email}
        placeholder={"Email"}
        style={signUpStyles.input}
      />

      <ControlledTextInput<SignUpInputs>
        name="password"
        label={"Mot de passe"}
        onInputChange={updateValue}
        textContentType={"newPassword"}
        secureTextEntry={true}
        value={fields.password}
        placeholder={"Mot de passe"}
        style={signUpStyles.input}
      />

      <ControlledTextInput<SignUpInputs>
        name="confirmPassword"
        label="Confirmer le mot de passe"
        onInputChange={updateValue}
        textContentType={"newPassword"}
        secureTextEntry={true}
        value={fields.confirmPassword}
        placeholder={"Confirmation mot de passe"}
        style={signUpStyles.input}
      />

      <CustomButton
        onPress={handleSubmit}
        style={signUpStyles.button}
        disabled={isLoading}
      >
        {!isLoading ? "Créer un compte" : "Loading..."}
      </CustomButton>

      <CustomLink
        title="Se connecter"
        style={signUpStyles.link}
        onPress={(_) => {
          navigation.navigate("Sign In");
        }}
      />
    </View>
  );
};

export default SignUpScreen;

const signUpStyles = StyleSheet.create({
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
