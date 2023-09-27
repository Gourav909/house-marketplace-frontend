import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import router from "./routers";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "./utils/currentUser.slice";

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
