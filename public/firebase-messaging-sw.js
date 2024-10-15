importScripts(
  "https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js"
);

self.addEventListener("install", function (e) {
  self.skipWaiting();
});

self.addEventListener("activate", function (e) {
  console.log("fcm service worker가 실행되었습니다.");
});

const firebaseConfig = {
  apiKey: "AIzaSyC5f5x21KEYINpAaF1xUEnJ93yTCQrsDcI",
  authDomain: "boardgo-f1c4b.firebaseapp.com",
  projectId: "boardgo-f1c4b",
  storageBucket: "boardgo-f1c4b.appspot.com",
  messagingSenderId: "680773196144",
  appId: "1:680773196144:web:c0dca9aedd1ce19c9597b5",
  measurementId: "G-L0EDMC4P1C"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.title;
  const notificationOptions = {
      body: payload.body
      // icon: payload.icon
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});