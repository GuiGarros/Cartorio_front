import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {userReducer} from "./slices/userslices"

const rootReducer = combineReducers({
  user: userReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});