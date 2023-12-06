# FIREBASE CLOUD NOTIFICATION

## For web

- step 1: login firebase account, create project then web app.
- step 2: open settings->project setting->service account
- step 3: click "generate new private key" will download json file containes authorization

# firebase initialization

## main imports
```
<script type="module">
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-messaging.js";
</script>
```

## initialization
- `configuration will be given in service accounts or when creating app`
```
let firebaseConfig = {
            apiKey: "AIzaSyBbOioBHuoWQZVE5ZF03Zq-Cg6Ik3wr12Q",
            authDomain: "my-project-3127-1688370933804.firebaseapp.com",
            projectId: "my-project-3127-1688370933804",
            storageBucket: "my-project-3127-1688370933804.appspot.com",
            messagingSenderId: "419862518105",
            appId: "1:419862518105:web:7c8adfd2af837f49939448",
            measurementId: "G-W7BHCEM0XE"
        };

     const app = initializeApp(firebaseConfig);
```

## showing messages

### when app is open (frontend is currently open by user)
```
const messaging = getMessaging(app);

onMessage(messaging, (payload) => {
    new Notification(
        payload.notification.title,
        {
            body: payload.notification.body, 
            icon: payload.notification.image,
            dir: 'rtl'
        })

});
```

### when app is not open (app is closesd)
- `for this we need onbackgroundmessage function and it is only available in the service worker context i.e not available in window context`. 
- `for background notification we have to register service worker. for that create a file named firebase-messaging-sw.js` in web root directry.

```
//register event when notification is clicked
self.addEventListener('notificationclick', function(event) {
  let url = event.notification.data.FCM_MSG.notification.click_action;
  console.log("redirect to after click", url)
	event.notification.close();
	event.waitUntil(
		clients.matchAll({type: 'window'}).then( windowClients => {
			for (var i = 0; i < windowClients.length; i++) {
				var client = windowClients[i];
				if (client.url === url && 'focus' in client) {
					return client.focus();
				}
			}

				if (clients.openWindow) {
				   return clients.openWindow(url);
			}
		})
	);
});

//import required scripts for service worker
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');


let firebaseConfig = {
    apiKey: "AIzaSyBbOioBHuoWQZVE5ZF03Zq-Cg6Ik3wr12Q",
    authDomain: "my-project-3127-1688370933804.firebaseapp.com",
    projectId: "my-project-3127-1688370933804",
    storageBucket: "my-project-3127-1688370933804.appspot.com",
    messagingSenderId: "419862518105",
    appId: "1:419862518105:web:7c8adfd2af837f49939448",
    measurementId: "G-W7BHCEM0XE"
};


const app = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
messaging.onBackgroundMessage((payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  );
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
```

### Service worker
- https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API

- `Service workers essentially act as proxy servers` that sit between `web applications`, `the browser`, and `the network` (when available). They are intended, among other things, to `enable the creation of effective offline experiences`, `intercept network requests `and take appropriate action based on whether the network is available, and `update assets residing on the server`. They will `also allow access to push notifications and background sync APIs`.

- A service worker is `run in a worker context`: it therefore `has no DOM access`, and `runs on a different thread to the main JavaScript that powers your app`, so it is `non-blocking`. It is designed to be `fully async`; as a consequence, APIs such as `synchronous XHR` and `Web Storage` `can't be used inside a service worker`.

## sending notification
- Need 4 things
    - OAuth access token by google.
    - Registered Browser token whom have accepted the notification permission from browser and want to see notification.
    - API ENDPOINT
    - Web Push certificates public key (settings -> project setting -> cloud messaging (generate key pair & copy public key))


### getting token by subscriber client
```
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-messaging.js";


Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
                getToken(messaging, {vapidKey: <Web Push certificates public key>}).then((currentToken) => {
                    if (currentToken) {
                        save_end_point_for_later_use(currentToken);
                        console.log("REGISTERED BROWSER TOKEN", currentToken)
                    } else {
                        // Show permission request UI
                        console.log('No registration token available. Request permission to generate one.');
                        // ...
                    }
                    }).catch((err) => {
                    console.log('An error occurred while retrieving token. ', err);
                    // ...
                });
            }
        });
```

### SENDING NOTIIFCATION FROM HTTP V1 api
- https://firebase.google.com/docs/reference/fcm/rest/v1/projects.messages/send?authuser=0

- `POST - https://fcm.googleapis.com/v1/projects/<PROJECT-ID>/messages:send`
- BODY: 
    {
    "validate_only": false,
    "message": {
    "token": `<REGISTERED BROWSER TOKEN>`,
    "notification":{
        "title": "From postman with image",
        "body": "This is the test notification from postman that contains image",
        "image": "http://localhost/1-SHOPWARE-MODULES/WebPushNotification-1/public/media/82/82/f5/1701433192/turtle.png"
    },
    "data":{
        "key1": "Value1"
    },
    "webpush": {
        "fcm_options": {
            "link": "https://www.youtube.com/watch?v=SaPOWEskPG8"
        }
        }
    }
    }
- HEADER: 
    Authorization: Bearer `GOOGLE ACCESS TOKEN`

### GETTING GOOGLE ACCESS TOKEN
- save the json file we got from firebase account and use it to send request for access JWT token.
```
npm i google-auth-library;

const {JWT} = require('google-auth-library');


function getAccessToken() {
    return new Promise(function(resolve, reject) {
      const key = require('./keys/aceessKeys.json');
      
      const jwtClient = new JWT(
        key.client_email,
        null,
        key.private_key,
        ['https://www.googleapis.com/auth/cloud-platform'],
        null
      );
      jwtClient.authorize(function(err, tokens) {
        if (err) {
          reject(err);
          return;
        }
        resolve(tokens.access_token);
      });
    });
  }
```

## IF got error in access permissions
- Add role in GCP with apporiate role (listed in IAM role for account on firebase)
- Assign role to linked account within same project in GCP. 