import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};
// export const firebaseApp = firebase.initializeApp(firebaseConfig);

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}
export default firebase;

// eslint-disable-next-line no-shadow
export async function getIdToken(firebase) {
  const token = firebase && await firebase.auth().currentUser.getIdToken();
  return token;
}
