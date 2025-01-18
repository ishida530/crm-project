import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
    apiKey: "AIzaSyBXIDYRyZrffRRTQiskoDQ8jaTIN8Fbvxo",
    authDomain: "javanothification.firebaseapp.com",
    projectId: "javanothification",
    storageBucket: "javanothification.firebasestorage.app",
    messagingSenderId: "679934953765",
    appId: "1:679934953765:web:df951f42d89b0a137f72cc",
    measurementId: "G-TNY99QHMN3",
    vapidKey: "BFnc_MC0es0u_AOzFDz1M2GAp2DDbRGIdReLAF69E0m0MR9wTor1tGYcFmIFWYMzm93RCI7ns30dUF986XN4U9M"
};


const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);

export { messaging, getToken, onMessage };
