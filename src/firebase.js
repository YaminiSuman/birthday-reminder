import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDPOLKY-ShWvAiYSHLHhWsHadbvm_gDhd8",
  authDomain: "birthday-reminder-app-1bae3.firebaseapp.com",
  projectId: "birthday-reminder-app-1bae3",
  storageBucket: "birthday-reminder-app-1bae3.appspot.com",
  messagingSenderId: "1026081786690",
  appId: "1:1026081786690:web:21a61143b844e66cb116db",
  measurementId: "G-D6GDWYP57S"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const storage = firebase.storage();
export { db, storage };
