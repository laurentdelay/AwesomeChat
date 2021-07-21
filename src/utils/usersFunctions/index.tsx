import { Data } from "react-firebase-hooks/firestore/dist/firestore/types";
import { UserDetails, UserDetailsWithId, userStore } from "../firebase";

export type UsersMap = Map<string, UserDetails>;

export const mapUsers = (users: Data<UserDetailsWithId, "", "">[]) => {
  const usersMap: UsersMap = new Map();

  users.forEach((user) => {
    usersMap.set(user.userId, {
      displayName: user.displayName,
      profilePic: user.profilePic,
    });
  });

  return usersMap;
};
