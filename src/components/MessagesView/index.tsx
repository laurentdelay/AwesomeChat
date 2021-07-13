import React, { useCallback } from "react";
import { ActivityIndicator, ListRenderItem, StyleSheet } from "react-native";

import { FlatList } from "react-native-gesture-handler";
import MessageDisplay from "./MessageDisplay";
import { MessageData } from "~/utils/messagesFunctions";
import { Data } from "react-firebase-hooks/firestore/dist/firestore/types";
import { useState } from "react";
import { useEffect } from "react";

type MessagesViewProps = {
  messages: Data<MessageData>[] | undefined;
  loadMore?: () => void;
  loading?: boolean;
};

const MessagesView = ({
  messages,
  loadMore = () => {},
  loading = false,
}: MessagesViewProps) => {
  const renderItem: ListRenderItem<Data<MessageData, "id">> = useCallback(
    ({ item: message }) => {
      const { id, author, body, createdAt } = message;

      return (
        <MessageDisplay
          key={id}
          author={author}
          body={body}
          createdAt={createdAt}
        />
      );
    },
    []
  );

  const [messagesBackUp, setMessagesBackUp] = useState<
    Data<MessageData>[] | undefined
  >(undefined);

  useEffect(() => {
    if (messages !== undefined) {
      setMessagesBackUp(messages);
    }
  }, [messages]);
  return (
    <>
      {loading && <ActivityIndicator />}
      <FlatList
        style={messagesViewStyles.messageList}
        data={loading ? messagesBackUp : messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        inverted
        onEndReached={loadMore}
        onEndReachedThreshold={-0.1}
      />
    </>
  );
};

export default MessagesView;

const messagesViewStyles = StyleSheet.create({
  messageList: { flex: 1 },
});
