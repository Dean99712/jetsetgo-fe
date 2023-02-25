import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage";

const firebase = {
    apiKey: "AIzaSyCzOpPBk6zNeMRB4CbAK2IW5X5y7WVUt_0",
    authDomain: "flightbooking-ef6d8.firebaseapp.com",
    projectId: "flightbooking-ef6d8",
    storageBucket: "flightbooking-ef6d8.appspot.com",
    messagingSenderId: "627325315146",
    appId: "1:627325315146:web:0b74caac72d35bfc155eb3",
    measurementId: "G-0BS5EB3CKY"
};

const app = initializeApp(firebase);
export const analytics = getAnalytics(app);
export const storage = getStorage(app)
