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
    vapidKey: "BGQuZkwmFXmudPjn-k545IcQq8syG6PFNfe5OfeEKZfNr1xaxDB5ZO4mulxthS8uX4W5I-lgzDrp_IqJ78Awl24"
};


const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);

export { messaging, getToken, onMessage };
