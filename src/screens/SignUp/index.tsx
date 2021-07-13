import React, { useCallback, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

import { useForm } from "~/hooks/useForm";
import { LoginStackParamList } from "~/routes/LoginStack";
import ControlledTextInput from "~/components/ControlledTextInput";
import CustomButton from "~/components/CustomButton";
import CustomLink from "~/components/CustomLink";
import { SignUpInputs } from "~/utils/types/authTypes";
import { register } from "~/utils/authFunctions";
import ErrorDisplay from "~/components/ErrorDisplay";
import { parseErrorMessage } from "~/utils/errorsFunctions";

type SignUpNavigationProp = StackNavigationProp<LoginStackParamList, "Sign Up">;

type SignUpScreenProps = {
  navigation: SignUpNavigationProp;
};

const SignUpScreen = ({ navigation }: SignUpScreenProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const { fields, updateValue } = useForm<SignUpInputs>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      displayName: "",
    },
  });

  const handleSubmit = async () => {
    setError("");
    setIsLoading(true);

    try {
      await register(fields);
    } catch (err) {
      setError(parseErrorMessage(err));
    }

    setIsLoading(false);
  };

  return (
    <View style={[signUpStyles.container]}>
      <ControlledTextInput<SignUpInputs>
        name="email"
        label={"Email"}
        onInputChange={updateValue}
        textContentType={"emailAddress"}
        autoCompleteType="email"
        value={fields.email}
        placeholder={"Email"}
        style={signUpStyles.input}
      />

      <ControlledTextInput<SignUpInputs>
        name="displayName"
        label="Pseudo"
        onInputChange={updateValue}
        textContentType={"nickname"}
        autoCompleteType="username"
        value={fields.displayName}
        placeholder={"Pseudo"}
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
        loading={isLoading}
      >
        Créer un compte
      </CustomButton>

      {error !== "" && <ErrorDisplay errorMessage={error} />}

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
    justifyContent: "center",
    padding: "10%",
  },
  input: { width: "100%" },
  button: { width: "100%" },
  link: { marginTop: 5 },
});
