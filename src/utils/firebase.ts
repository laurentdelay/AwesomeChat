import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import { firebaseDevConfig } from "./env";

export type User = firebase.User | null;
export type UploadTask = firebase.storage.UploadTask;

const fireApp = firebase.initializeApp(firebaseDevConfig);

export const auth = fireApp.auth();

const firestore = firebase.firestore();

export const errorsStore = firestore.collection("errorCodes");
export const messagesStore = firestore.collection("messages");

const fireStorage = firebase.storage();

export const imageStorageRef = fireStorage.ref("profiles_images");

export const TaskStates = firebase.storage.TaskState;
