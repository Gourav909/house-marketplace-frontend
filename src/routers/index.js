import React from "react";
import { createBrowserRouter } from "react-router-dom";

import LoginPage from "../pages/login/Login";
import SignUp from "../pages/signUp/SignUp";

import * as ROUTES from "../constants/routes";

const router = createBrowserRouter([
  {
    path: "*",
    element: <LoginPage />,
  },
  {
    path: ROUTES.SIGN_UP,
    element: <SignUp />,
  }
]);
export default router;
