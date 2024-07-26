import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyB4JDOCH7VnGVotwtsMQZD6GqgKwLgNw5k",
    authDomain: "workchat-92883.firebaseapp.com",
    projectId: "workchat-92883",
    storageBucket: "workchat-92883.appspot.com",
    messagingSenderId: "1062792907732",
    appId: "1:1062792907732:web:bc6b1a7245ae5e866c2441",
    measurementId: "G-2CCHY5KFWM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app); // getAuth fonksiyonu kullanılarak auth öğesi oluşturuluyor

export { auth };