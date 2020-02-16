import * as firebase from 'firebase';

// absolutely nothing to see here...
const config = {
  apiKey: "AIzaSyAQaxqodLbusOqZ4zLKmfJIQmZoMLwxFsM",
  authDomain: "my-app-f87d2.firebaseapp.com",
  databaseURL: "https://my-app-f87d2.firebaseio.com",
  projectId: "my-app-f87d2",
  storageBucket: "my-app-f87d2.appspot.com",
  messagingSenderId: "454323936551",
  appId: "1:454323936551:web:d74acb5002ff8bf939dd02"
};

firebase.initializeApp(config);

export default firebase;
