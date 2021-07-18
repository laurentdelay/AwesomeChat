import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ProfilePic from "~/components/ProfilePic";
import { useAuth } from "~/contexts/AuthContext";
import themeColors from "~/utils/colors";
import { MessageData } from "~/utils/messagesFunctions";

interface MessageDisplayProps extends MessageData {}

const MessageDisplay = ({ body, author }: MessageDisplayProps) => {
  const { user } = useAuth();

  const isUserAuthor = user?.displayName === author;
  return (
    <View
      style={[
        messageStyles.messageContainer,
        isUserAuthor
          ? {
              flexDirection: "row-reverse",
            }
          : {},
      ]}
    >
      <ProfilePic picUri={user?.photoURL} width={40} />
      <View style={messageStyles.messageContent}>
        <Text style={messageStyles.authorName}>{author}</Text>
        <View
          style={[
            messageStyles.bubble,
            isUserAuthor
              ? messageStyles.userBubble
              : messageStyles.contactBubble,
          ]}
        >
          <Text style={messageStyles.messageText}>{body}</Text>
        </View>
      </View>
    </View>
  );
};

export default MessageDisplay;

const messageStyles = StyleSheet.create({
  messageContainer: {
    flex: 1,
    flexDirection: "row",
    padding: 5,
    alignItems: "flex-end",
    justifyContent: "flex-start",
  },
  messageContent: {
    marginHorizontal: 8,
  },
  bubble: {
    borderRadius: 8,
    padding: 10,
  },
  userBubble: {
    backgroundColor: themeColors.primary,
  },
  contactBubble: {
    backgroundColor: themeColors.secondary,
  },
  messageText: {
    fontSize: 15,
    color: "#ffffff",
  },
  authorName: { fontSize: 10 },
});
