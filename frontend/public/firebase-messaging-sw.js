// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

// Initialize the Firebase app in the service worker
// "Default" Firebase configuration (prevents errors)
const defaultConfig = {
  apiKey: true,
  projectId: true,
  messagingSenderId: true,
  appId: true,
};

firebase.initializeApp({
  apiKey: "AIzaSyBXIDYRyZrffRRTQiskoDQ8jaTIN8Fbvxo",
  authDomain: "javanothification.firebaseapp.com",
  projectId: "javanothification",
  storageBucket: "javanothification.firebasestorage.app",
  messagingSenderId: "679934953765",
  appId: "1:679934953765:web:df951f42d89b0a137f72cc",
  measurementId: "G-TNY99QHMN3",
  vapidKey: "BFnc_MC0es0u_AOzFDz1M2GAp2DDbRGIdReLAF69E0m0MR9wTor1tGYcFmIFWYMzm93RCI7ns30dUF986XN4U9M"
});

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message: ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon || '/default-icon.png', // Dodaj ikonę, jeśli chcesz

  };

  onMessage(messaging, (payload) => {
    console.log("Message received. ", payload);
    // Tutaj można ręcznie pokazać powiadomienie, np. przy użyciu Notification API
  });

  self.addEventListener('push', function (event) {
    let options = {
      body: event.data.text(),  // Treść powiadomienia
      icon: 'icons/icon.png',   // Ikona powiadomienia
      badge: 'icons/badge.png'  // Ikona wyświetlana na pasku powiadomień
    };

    event.waitUntil(
      self.registration.showNotification('Tytuł powiadomienia', options)
    );
  });
  // Wyświetl powiadomienie, gdy aplikacja jest w tle
  self.registration.showNotification(notificationTitle, notificationOptions);
});


