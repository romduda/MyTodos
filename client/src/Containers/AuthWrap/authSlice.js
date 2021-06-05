/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: 'pending',
  error: null,
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    userSignedIn: (state, action) => {
      state.status = 'success';
      state.error = null;
      state.user = action.payload.user;
    },
    noUser: (state) => {
      state.status = 'success';
      state.error = null;
      state.user = null;
    },
  },
});

export const { userSignedIn, noUser } = authSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectAuthState = (state) => state.auth;

export default authSlice.reducer;
