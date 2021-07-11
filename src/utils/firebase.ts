import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { firebaseDevConfig } from "./env";

const fireApp = firebase.initializeApp(firebaseDevConfig);

export type fireDocumentData =
  firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>;

export const auth = fireApp.auth();

const firestore = firebase.firestore();

export const errorsStore = firestore.collection("errorCodes");
export const messagesStore = firestore.collection("messages");
