import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import {
  TextField,
  Button,
  Box,
  Grid,
  Typography,
  Snackbar,
  Alert,
  CircularProgress,
  Paper,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import LoginImage from "../../assets/login.svg";
import { LoginValidationSchema } from "./login.schema";
import { loginUser, clearState } from "./login.slice";

const LoginPage = () => {
  const [isShowSnackBar, setIsShowSnackBar] = useState({
    open: false,
    vertical: "top",
    horizontal: "right",
    altMessage: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isSuccess, isError, error, isLoading } = useSelector(
    (state) => state.login
  );

  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: { email: "", password: "" },
      validationSchema: LoginValidationSchema,

      onSubmit: (values) => {
        handleLogin(values);
      },
    });

  const handleLogin = async (values) => {
    dispatch(loginUser({ ...values }));
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setIsShowSnackBar((prevState) => ({ ...prevState, open: false }));
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate(navigate("/"));
    }

    if (isError) {
      // show snackbar
      dispatch(clearState());
    }
  });

  const { vertical, horizontal, open, altMessage } = isShowSnackBar;

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={7}>
          <img src={LoginImage} alt="login" />
        </Grid>
        <Grid
          item
          xs={12}
          md={5}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            key={vertical + horizontal}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity="error"
              sx={{ width: "100%" }}
            >
              {altMessage}
            </Alert>
          </Snackbar>
          <Box
            sx={{
              width: "70%",
            }}
          >
            <Paper
              elevation={3}
              style={{
                padding: "20px",
                background: "#fbfbfb",
                border: "1px solid #ccc",
              }}
            >
              <Typography component="h1" variant="h5">
                Login
              </Typography>
              <Box component="form" onSubmit={handleSubmit} noValidate>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && errors.email && true}
                  helperText={touched.email && errors.email}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password && errors.password && true}
                  helperText={touched.password && errors.password}
                />
                <Grid container />
                <Box sx={{ mt: 2 }}>
                  {isLoading ? (
                    <CircularProgress />
                  ) : (
                    <Button
                      disableElevation
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      Login
                    </Button>
                  )}
                </Box>
              </Box>
              <Grid container justifyContent="center" sx={{ mt: 2 }}>
                <Typography
                  sx={{
                    mr: 1,
                  }}
                >
                  Don't have an account?
                </Typography>

                <Link
                  style={{ marginTop: "2px" }}
                  to="/sign-up"
                  variant="body2"
                >
                  Sign up
                </Link>
              </Grid>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
export default React.memo(LoginPage);
