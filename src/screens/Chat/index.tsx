import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { ActivityIndicator, StyleSheet, View } from "react-native";

import ErrorDisplay from "~/components/ErrorDisplay";
import MessagesView from "~/components/MessagesView";
import { messagesStore } from "~/utils/firebase";
import ChatForm from "./ChatForm";

type ChatScreenProps = {};

const ChatScreen = ({}: ChatScreenProps) => {
  const query = messagesStore.orderBy("createdAt").limit(5);
  const [messages, loading, error] = useCollection(query);

  return (
    <View style={chatScreenStyles.container}>
      {error !== undefined && <ErrorDisplay errorMessage={error.message} />}
      {loading && <ActivityIndicator />}
      {messages != undefined && <MessagesView messages={messages.docs} />}
      <ChatForm />
    </View>
  );
};

export default ChatScreen;

const chatScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
