// import { initializeApp } from "firebase/app";
// import { getMessaging } from "firebase/messaging";

// // TODO: Replace the following with your app's Firebase project configuration
// // See: https://firebase.google.com/docs/web/learn-more#config-object
// const firebaseConfig = {
//     apiKey: "AIzaSyBXibeZC-vEjCOetmvBhwFS3mYz3VcyzRU",
//     authDomain: "test-tpv2.firebaseapp.com",
//     databaseURL: "https://test-tpv2-default-rtdb.asia-southeast1.firebasedatabase.app",
//     projectId: "test-tpv2",
//     storageBucket: "test-tpv2.appspot.com",
//     messagingSenderId: "915926362222",
//     appId: "1:915926362222:web:b3f914ef56f454161c5e7f",
//    // measurementId: "G-7429HVQX2D"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);


// // Initialize Firebase Cloud Messaging and get a reference to the service
// const messaging = getMessaging(app);
// import { getToken } from "firebase/messaging";
// // import { app } from "@/main.js";
// // Get registration token. Initially this makes a network call, once retrieved
// // subsequent calls to getToken will return from cache.
// // const messaging = getMessaging();
// getToken(messaging, { vapidKey: 'BJw0IaMJiCU895t7oCswxP06NhxLlfV39whGDSelluOBGzextq0WJ1oeaVQwc8gvVFh5HMXzshm_0QCIcJU_TNU' }).then((currentToken) => {
//   if (currentToken) {
//     // Send the token to your server and update the UI if necessary
//     console.log("used")
//     // ...
//   } else {
//     // Show permission request UI
//     console.log('No registration token available. Request permission to generate one.');
//     // ...
//   }
// }).catch((err) => {
//   console.log('An error occurred while retrieving token. ', err);
//   // ...
// });