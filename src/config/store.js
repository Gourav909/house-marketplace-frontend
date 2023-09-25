import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../pages/login/login.slice";
import signUpReducer from "../pages/signUp/signUp.slice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    signUp: loginReducer
  },
});
