// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.2.7/firebase-app.js");
// eslint-disable-next-line no-undef
importScripts("https://www.gstatic.com/firebasejs/8.2.7/firebase-messaging.js");

const firebaseConfig = {
  // firebase config credentials
  apiKey: "AIzaSyBXibeZC-vEjCOetmvBhwFS3mYz3VcyzRU",
  authDomain: "test-tpv2.firebaseapp.com",
  databaseURL: "https://test-tpv2-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "test-tpv2",
  storageBucket: "test-tpv2.appspot.com",
  messagingSenderId: "915926362222",
  appId: "1:915926362222:web:b3f914ef56f454161c5e7f",
  measurementId: "G-7429HVQX2D"
};
// eslint-disable-next-line no-undef
const app = firebase.initializeApp(firebaseConfig);

const messaging = app.messaging();
// eslint-disable-next-line no-undef
// onMessage(messaging,(payload) => {
//   console.log('Message received. ', payload);
//   // ...
// });

messaging.onBackgroundMessage((payload) => {
  // messaging.onMessage((payload) => {
    console.log("[firebase-messaging-sw.js] Received background message ", payload.data.notification);
    // Customize notification here
    const notificationTitle = "Tring Partner";
    const notificationOptions = {
      body: "Tring Partner",
      icon:  "/tring-logo.png"
    };
  
    self.registration.showNotification(notificationTitle,
      notificationOptions);
  });
  
  // 
// self.addEventListener('notificationclick', function(event) {
//   console.log('[firebase-messaging-sw.js] Received notificationclick event ', event);
  
//   var click_action = event.notification.data;
//   event.notification.close();
//   // This looks to see if the current is already open and
//   // focuses if it is
//   // eslint-disable-next-line no-undef
//   event.waitUntil(clients.matchAll({
//       type: "window"
//   }).then(function(clientList) {
//       for (var i = 0; i < clientList.length; i++) {
//           var client = clientList[i];
//           if (client.url == click_action  && 'focus' in client)
//               return client.focus();
//       }
//       // eslint-disable-next-line no-undef
//       if (clients.openWindow)
//           // eslint-disable-next-line no-undef
//           return clients.openWindow(click_action);
//       }));
  
//   });
//   const showMessage = function(payload){
//       console.log('showMessage', payload);
//       const notificationTitle = payload.data.title;
//       const notificationOptions = {
//           body: payload.data.body,
//           icon: payload.data.icon,
//           image: payload.data.image,
//           click_action: payload.data.click_action,
//           data:payload.data.click_action
//       };  
  
  
//     return self.registration.showNotification(notificationTitle,notificationOptions); 
//   }   
//   messaging.setBackgroundMessageHandler(showMessage);
  
//   self.addEventListener('message', function (evt) {     
//     console.log("self",self);
//     showMessage( evt.data );
//   })