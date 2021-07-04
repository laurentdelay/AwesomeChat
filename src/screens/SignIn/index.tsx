import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

import ControlledTextInput from "~/components/ControlledTextInput";
import CustomButton from "~/components/CustomButton";
import CustomLink from "~/components/Link";
import useForm from "~/hooks/useForm";
import { LoginStackParamList } from "~/routes/LoginRoutes";

type SignInInputs = {
  email: string;
  password: string;
};

type SignInNavigationProp = StackNavigationProp<LoginStackParamList, "Sign In">;

type SignInScreenProps = {
  navigation: SignInNavigationProp;
};

const SignInScreen = ({ navigation }: SignInScreenProps) => {
  const { fields, updateValue, handleSubmit } = useForm<SignInInputs>({
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = useCallback((data) => {
    navigation.navigate("Home");
  }, []);

  return (
    <View style={signInStyles.container}>
      <ControlledTextInput<SignInInputs>
        name="email"
        label={"Email"}
        onInputChange={updateValue}
        textContentType="emailAddress"
        value={fields.email}
        placeholder={"Email"}
        style={signInStyles.input}
      />

      <ControlledTextInput<SignInInputs>
        name="password"
        label={"Mot de passe"}
        onInputChange={updateValue}
        textContentType="password"
        secureTextEntry={true}
        value={fields.password}
        placeholder={"Mot de passe"}
        style={signInStyles.input}
      />

      <CustomButton
        onPress={(_) => {
          handleSubmit(onSubmit);
        }}
        style={signInStyles.button}
      >
        Connexion
      </CustomButton>
      <CustomLink
        title="Créer un compte"
        style={signInStyles.link}
        onPress={(_) => {
          navigation.navigate("Sign Up");
        }}
      />

      <CustomLink
        title={"Mot de passe oublié?"}
        style={signInStyles.link}
        onPress={(_) => navigation.navigate("Reset Password")}
      />
    </View>
  );
};

export default SignInScreen;

const signInStyles = StyleSheet.create({
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
