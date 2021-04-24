import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import allListsReducer from '../Containers/AllLists/allListsSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    allLists: allListsReducer,
  },
});
