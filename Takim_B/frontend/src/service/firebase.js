import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyBxOKSsrecQiR5VKG1f6RYGB6b_QrgHxQU",
  authDomain: "market-3bea0.firebaseapp.com",
  projectId: "market-3bea0",
  storageBucket: "market-3bea0.appspot.com",
  messagingSenderId: "515666019554",
  appId: "1:515666019554:web:0778ff5268ed7cba784abb",
  measurementId: "G-6306N4N39V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app); 

export { auth }; 