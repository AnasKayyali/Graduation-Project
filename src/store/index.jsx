import { configureStore } from '@reduxjs/toolkit';
import sideBarReducer from './sideBar';

const store = configureStore({
  reducer: { sideBar: sideBarReducer },
});

export default store;