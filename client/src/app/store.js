import { configureStore } from '@reduxjs/toolkit';
import allListsReducer from '../Containers/AllLists/allListsSlice';

export const store = configureStore({
  reducer: {
    allLists: allListsReducer,
  },
});
