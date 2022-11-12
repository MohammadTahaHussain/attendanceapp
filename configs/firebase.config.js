import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyD4k9iqNaan0q6_pgZSMX1ZzNxK2j6EYMg",
  authDomain: "saylani-lms-2f1cf.firebaseapp.com",
  projectId: "saylani-lms-2f1cf",
  storageBucket: "saylani-lms-2f1cf.appspot.com",
  messagingSenderId: "298063171231",
  appId: "1:298063171231:web:3bf0ac1fb06a8f56739caa",
  measurementId: "G-HHKGGCR1HV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);