import React, { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

import ControlledTextInput from "~/components/ControlledTextInput";
import CustomButton from "~/components/CustomButton";
import CustomLink from "~/components/Link";
import useForm from "~/hooks/useForm";
import { LoginStackParamList } from "~/routes/LoginRoutes";
import { useAuth } from "~/contexts/AuthContext";
import { SignInInputs } from "~/utils/types/authTypes";
import { login } from "~/utils/authFunctions";

type SignInNavigationProp = StackNavigationProp<LoginStackParamList, "Sign In">;

type SignInScreenProps = {
  navigation: SignInNavigationProp;
};

const SignInScreen = ({ navigation }: SignInScreenProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { user } = useAuth();
  const { fields, updateValue } = useForm<SignInInputs>({
    defaultValues: { email: "", password: "" },
  });

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      await login(fields);
    } catch (error) {
      console.log(error.code);
    }
    setIsLoading(false);
  };

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
        onPress={handleSubmit}
        style={signInStyles.button}
        disabled={isLoading}
      >
        {!isLoading ? "Connexion" : "Loading..."}
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
