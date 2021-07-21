import { messagesStore } from "../firebase";

export interface MessageData {
  body: string;
  authorUid: string;
  createdAt: Date;
}

export const sendMessage = async (messageData: MessageData): Promise<void> => {
  if (messageData.body !== "") await messagesStore.add(messageData);
};
