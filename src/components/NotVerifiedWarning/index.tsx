import React, { useState } from "react";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAuth } from "~/contexts/AuthContext";
import { warningColor } from "~/utils/colors";
import CustomLink from "../CustomLink";

const NotVerifiedWarning = () => {
  const { user } = useAuth();
  const [sentMail, setSentMail] = useState<boolean>(false);

  const sendEmail = async () => {
    if (user === null) return;
    await user.sendEmailVerification?.();
    setSentMail(true);
  };

  return (
    <View style={warningStyles.warningContainer}>
      <Text style={warningStyles.warningText}>
        Vous devez confirmer votre email pour vous connecter.
      </Text>
      <CustomLink
        title="Renvoyer l'email"
        color={"warning"}
        style={{
          borderBottomWidth: 1,
          borderBottomColor: warningColor,
        }}
        onPress={sendEmail}
        disabled={sentMail}
      />
    </View>
  );
};

export default NotVerifiedWarning;

const warningStyles = StyleSheet.create({
  warningContainer: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: "80%",
    margin: 8,
    padding: 8,

    borderColor: warningColor,
    borderWidth: 2,
    borderRadius: 5,

    backgroundColor: warningColor.toString() + "33",
  },
  warningText: {
    color: warningColor,
    fontWeight: "500",
  },
});
