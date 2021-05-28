import { fireConfig } from "./fireConfig";
import firebase from "firebase/app";
import "firebase/auth"; // eslint-disable-line no-unused-vars
import "firebase/firestore"; // eslint-disable-line no-unused-vars
import "firebase/functions"; // eslint-disable-line no-unused-vars

const fire = firebase.initializeApp(fireConfig);
const auth = new firebase.auth();
const db = firebase.firestore();
const functions = firebase.functions();
const settings = {};
db.settings(settings);

export { fire, auth, db, functions };
