import React from "react";
import { ListRenderItem, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { FlatList } from "react-native-gesture-handler";
import { fireDocumentData } from "~/utils/firebase";
import MessageDisplay from "./MessageDisplay";

type MessagesViewProps = {
  messages: fireDocumentData[];
};

const MessagesView = ({ messages }: MessagesViewProps) => {
  const renderItem: ListRenderItem<fireDocumentData> = ({ item: message }) => {
    const { author, body, createdAt } = message.data();

    return (
      <MessageDisplay
        key={message.id}
        author={author}
        body={body}
        createdAt={createdAt}
      />
    );
  };

  return (
    <FlatList
      data={messages}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

export default MessagesView;

const styles = StyleSheet.create({});
