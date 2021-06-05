import { configureStore } from '@reduxjs/toolkit';
import allListsReducer from '../Containers/AllLists/allListsSlice';
import selectedListReducer from '../Containers/SelectedList/selectedListSlice';
import authReducer from '../Containers/AuthProvider/authSlice';

export const store = configureStore({
  reducer: {
    allLists: allListsReducer,
    selectedList: selectedListReducer,
    auth: authReducer,
  },
});
