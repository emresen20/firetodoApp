import { initializeApp} from 'firebase/app';
import { getFirestore} from 'firebase/firestore';
//import { getAuth} from 'firebase/auth';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDhoQf2PRwQFw-rDxLzB48bsK-rz3Lloh4",
    authDomain: "firetodoapp-7f877.firebaseapp.com",
    projectId: "firetodoapp-7f877",
    storageBucket: "firetodoapp-7f877.appspot.com",
    messagingSenderId: "545176608889",
    appId: "1:545176608889:web:1b706fe9631328a81ff4a8"
};

export const FIREBASE_APP  = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
//export const FIREBASE_AUTH = getAuth(FIREBASE_APP);

