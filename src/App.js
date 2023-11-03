import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import router from "./routers";
import { getCurrentUser } from "src/utils/commonSlices/currentUser.slice";

function App() {
  const theme = createTheme();
  const dispatch = useDispatch();
  const currentUser = localStorage.getItem("currentUser");

  useEffect(() => {
    if (currentUser) {
      dispatch(getCurrentUser());
    }
  }, [dispatch, currentUser]);

  return (
    <React.StrictMode>
      <div className="App">
        <ToastContainer />
        <ThemeProvider theme={theme}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </div>
    </React.StrictMode>
  );
}

export default App;
