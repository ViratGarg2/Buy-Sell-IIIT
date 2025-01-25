// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1aagwYTOzQuYTpsWojOJHveAdUFWWe6c",
  authDomain: "buy-sell-8ac53.firebaseapp.com",
  projectId: "buy-sell-8ac53",
  storageBucket: "buy-sell-8ac53.firebasestorage.app",
  messagingSenderId: "666528436889",
  appId: "1:666528436889:web:1cb49629a58b349e275e08",
  measurementId: "G-L4SRP000LT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);