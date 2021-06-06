import './Login.css';
import React from 'react';

// Firebase
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
// import { firebaseConfig } from '../../auth/firebase';

import firebase from '../../auth/firebase';

const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false,
  },
};

export function Login() {
  return (
    <div>
      <h1>My Todos</h1>
      <p>Please sign-in or register:</p>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  );
}
