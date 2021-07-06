import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { firebaseDevConfig } from "./env";

const fireApp = firebase.initializeApp(firebaseDevConfig);

export const auth = fireApp.auth();
