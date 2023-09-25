import React, { useState } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Typography,
  Grid,
  Box,
  Snackbar,
  Alert,
  CircularProgress
} from "@mui/material";


import SignUpImage from "../../assets/signup.svg";
import SignUpValidationSchema from "./signUp.schema";
import { signUpUser, clearState } from "./signUp.slice";

const SignUp = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isSuccess, isError, error, isLoading } = useSelector((state) => state.signUp);

  const [isShowSnackBar, setIsShowSnackBar] = useState({
    open: false,
    vertical: "top",
    horizontal: "right",
    altMessage: "",
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      type: "User",
    },
    validationSchema: SignUpValidationSchema,

    onSubmit: (values) => {
      dispatch(signUpUser(values));
    },
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setIsShowSnackBar((prevState) => ({ ...prevState, open: false }));
  };

  const { vertical, horizontal, open, altMessage } = isShowSnackBar;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={7}>
        <img src={SignUpImage} alt="sign-up" />
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
        <Box
          sx={{
            width: "70%",
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
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={3}>
              {["name", "email", "password", "password_confirmation"].map(
                (field) => (
                  <Grid item xs={12} key={field}>
                    <TextField
                      fullWidth
                      id={field}
                      name={field}
                      label={
                        field === "password_confirmation"
                          ? "Confirm Password"
                          : field
                      }
                      type={
                        field === "password" ||
                        field === "password_confirmation"
                          ? "password"
                          : "text"
                      }
                      variant="outlined"
                      value={formik.values[field]}
                      onChange={formik.handleChange}
                      error={
                        formik.touched[field] && Boolean(formik.errors[field])
                      }
                      helperText={formik.touched[field] && formik.errors[field]}
                    />
                  </Grid>
                )
              )}
            </Grid>
            { isLoading ? <CircularProgress/> :
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
            }

            <Grid container justifyContent="center">
              <Typography>
                Have an account?{" "}
                <Link to="/" variant="body2">
                  Sign in
                </Link>
              </Typography>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SignUp;
