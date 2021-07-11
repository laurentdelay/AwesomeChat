import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAuth } from "~/contexts/AuthContext";
import { MessageData } from "~/utils/messagesFunctions";

interface MessageDisplayProps extends MessageData {}

const MessageDisplay = ({ body, author, createdAt }: MessageDisplayProps) => {
  const { user } = useAuth();

  return (
    <View
      style={[
        messageStyles.messageContainer,
        {
          borderBottomColor: user?.displayName === author ? "blue" : "red",
          borderBottomWidth: 1,
        },
      ]}
    >
      <Text style={messageStyles.authorName}>{author}</Text>
      <Text style={messageStyles.messageText}>{body}</Text>
    </View>
  );
};

export default MessageDisplay;

const messageStyles = StyleSheet.create({
  messageContainer: {},
  messageText: {},
  authorName: {},
});
