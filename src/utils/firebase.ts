import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

import { firebaseDevConfig } from "./env";
import { firebaseConfig } from "./env";

export type User = firebase.User | null;
export interface UserDetails {
  displayName: string;
  profilePic: string | null;
}

export interface UserDetailsWithId extends UserDetails {
  userId: string;
}

export type UploadTask = firebase.storage.UploadTask;

const fireApp = firebase.initializeApp(
  __DEV__ ? firebaseDevConfig : firebaseConfig
);

export const auth = fireApp.auth();

const firestore = firebase.firestore();

export const errorsStore = firestore.collection("errorCodes");
export const messagesStore = firestore.collection("messages");
export const userStore = firestore.collection("users");

const fireStorage = firebase.storage();

export const imageStorageRef = fireStorage.ref("profiles_images");

export const TaskStates = firebase.storage.TaskState;
