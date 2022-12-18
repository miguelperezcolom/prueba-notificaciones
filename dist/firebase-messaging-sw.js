importScripts('https://www.gstatic.com/firebasejs/7.18.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.18.0/firebase-messaging.js');
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAYL6leV3jatbvruznF4oeQiRdfKLCoTcs",
    authDomain: "demo1-2009e.firebaseapp.com",
    projectId: "demo1-2009e",
    storageBucket: "demo1-2009e.appspot.com",
    messagingSenderId: "714116773326",
    appId: "1:714116773326:web:b8bd53ba4a54d2c889679f",
    measurementId: "G-Q8RV886BL3"
};
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
messaging.usePublicVapidKey('BGVoGd9MNzhlSADscWhsh18ijPsNEZDHLwPyhh2WQfLDqa7KBfkJW1Cw3TiGaeHoZtliHgJT8N3G6cIcKdhYe30');
messaging.onBackgroundMessage(function(payload) {
    console.log('mensaje recibido', payload);
    const notificationTitle = payload.data.title;
    const notificationOptions = {
        body: payload.data.message,
        icon:'https://mateu.io/logomateu.png',
        data: { url:payload.data.url }, //the url which we gonna use later
    };
    return self.registration.showNotification(notificationTitle,notificationOptions);
});
//Code for adding event on click of notification
self.addEventListener('notificationclick', function(event) {
    console.log('click en mensaje recibido', event);
    let url = event.notification.data.url;
    event.notification.close();
    event.waitUntil(
        clients.matchAll({type: 'window'}).then( windowClients => {
// Check if there is already a window/tab open with the target URL
            for (var i = 0; i < windowClients.length; i++) {
                var client = windowClients[i];
// If so, just focus it.
                if (client.url === url && 'focus' in client) {
                    return client.focus();
                }
            }
// If not, then open the target URL in a new window/tab.
            if (clients.openWindow) {
                return clients.openWindow(url);
            }
        })
    );
});
