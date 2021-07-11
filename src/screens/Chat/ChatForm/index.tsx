import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import ControlledTextInput from "~/components/ControlledTextInput";
import CustomButton from "~/components/CustomButton";
import { useAuth } from "~/contexts/AuthContext";
import { useForm } from "~/hooks/useForm";
import { sendMessage } from "~/utils/messagesFunctions";

type MessageInput = { body: string };

const ChatForm = () => {
  const { user } = useAuth();

  const { fields, updateValue } = useForm<MessageInput>({
    defaultValues: { body: "" },
  });

  const handleSendMessage = async () => {
    if (user === null) {
      throw new Error("Vous devez être connecté.");
    }

    try {
      await sendMessage({
        ...fields,
        author: user.displayName,
        createdAt: new Date(),
      });
      updateValue("body", "");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View style={chatFormStyles.formContainer}>
      <ControlledTextInput<MessageInput>
        name="body"
        placeholder="Message"
        value={fields.body}
        onInputChange={updateValue}
        style={chatFormStyles.input}
      />

      <CustomButton onPress={handleSendMessage} style={chatFormStyles.button}>
        <MaterialCommunityIcons name="send" size={18} color={"white"} />
      </CustomButton>
    </View>
  );
};

export default ChatForm;

const chatFormStyles = StyleSheet.create({
  formContainer: {
    maxHeight: 60,

    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",

    padding: 5,
  },
  input: {
    width: "85%",
    height: Dimensions.get("window").width * 0.13,
    marginRight: 5,
  },
  button: {
    width: "13%",
    aspectRatio: 1 / 1,
  },
});
