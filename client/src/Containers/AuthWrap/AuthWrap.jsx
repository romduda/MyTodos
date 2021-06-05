import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userSignedIn, noUser, selectAuthState } from './authSlice';

import { firebaseApp } from '../../auth/firebase';

export function AuthWrap({ children }) {
  const dispatch = useDispatch();
  const authState = useSelector(selectAuthState);

  // Listen to the Firebase Auth state and set the Auth state in Redux.
  useEffect(() => {
    const unregisterAuthObserver = firebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch(userSignedIn({ user }));
      } else {
        dispatch(noUser());
      }
    });
    // Make sure we un-register Firebase observers when the component unmounts.
    return () => unregisterAuthObserver();
  }, [authState]);

  let renderedAuthWrap;
  switch (authState.status) {
    case 'pending':
      renderedAuthWrap = 'Loading...';
      break;
    case 'error':
      renderedAuthWrap = (
        <div>
          Oh no
          <div>
            <pre>{authState.error.message}</pre>
          </div>
        </div>
      );
      break;
    default:
      renderedAuthWrap = children;
      break;
  }
  return <div>{renderedAuthWrap}</div>;
}
