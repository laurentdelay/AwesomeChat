import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { UserDetailsWithId, userStore } from "~/utils/firebase";
import { mapUsers, UsersMap } from "~/utils/usersFunctions";

type UsersState = {
  chatUsers: UsersMap;
  isLoadingUsers: boolean;
};

const ChatUsersContext = createContext<UsersState>({
  chatUsers: new Map(),
  isLoadingUsers: true,
});

export const useChatUsers = () => {
  const context = useContext(ChatUsersContext);

  if (context === undefined) {
    throw new Error("useUsers must be used in a UsersProvider");
  }

  return context;
};

const ChatUsersProvider = ({ children }: { children: ReactNode }) => {
  const [chatUsers, setChatUsers] = useState<UsersMap>(new Map());
  const query = userStore;

  const [users, isLoadingUsers, error] = useCollectionData<UserDetailsWithId>(
    query,
    {
      idField: "userId",
      refField: "ref",
    }
  );

  useEffect(() => {
    if (users === undefined) return;
    setChatUsers(mapUsers(users));
  }, [users]);

  return (
    <ChatUsersContext.Provider value={{ chatUsers, isLoadingUsers }}>
      {children}
    </ChatUsersContext.Provider>
  );
};

export default ChatUsersProvider;
