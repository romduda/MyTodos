import React from 'react';
import { useSelector } from 'react-redux';
import { AllLists } from './Containers/AllLists/AllLists';
import { SelectedList } from './Containers/SelectedList/SelectedList';
import { AuthWrap } from './Containers/AuthWrap/AuthWrap';
import { Login } from './Containers/Login/Login';
import { selectAuthState } from './Containers/AuthWrap/authSlice';
import './App.css';
import firebase from './auth/firebase'; // eslint-disable-line

function App() {
  const { user } = useSelector(selectAuthState);
  const authenticatedApp = (
    <main className="main">
      <AllLists />
      <SelectedList />
    </main>
  );
  const unauthenticatedApp = (<Login />);
  return (
    <AuthWrap>
      <div className="App">
        { user ? authenticatedApp : unauthenticatedApp}
        <footer />
      </div>
    </AuthWrap>
  );
}

export default App;
