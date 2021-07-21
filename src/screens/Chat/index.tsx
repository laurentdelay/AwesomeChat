import React, { useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { ActivityIndicator, StyleSheet, View } from "react-native";

import ErrorDisplay from "~/components/ErrorDisplay";
import MessagesView from "~/components/MessagesView";
import { messagesStore } from "~/utils/firebase";
import { MessageData } from "~/utils/messagesFunctions";
import ChatForm from "./ChatForm";

type ChatScreenProps = {};

const BASE_LIMIT = 10;

const ChatScreen = ({}: ChatScreenProps) => {
  const [limit, setLimit] = useState<number>(BASE_LIMIT);

  const query = messagesStore.orderBy("createdAt", "desc").limit(limit);

  const [messages, loading, error] = useCollectionData(query, {
    idField: "id",
    transform: (val: any) => val as MessageData,
  });

  const loadMore = () => {
    if (messages?.length !== undefined && messages.length >= limit)
      setLimit((limit) => limit + BASE_LIMIT);
  };

  return (
    <View style={chatScreenStyles.container}>
      {error !== undefined && <ErrorDisplay errorMessage={error.message} />}

      <MessagesView messages={messages} loadMore={loadMore} loading={loading} />

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
