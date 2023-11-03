import React from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Button,
  TextField,
  Typography,
  Grid,
  Box,
  CircularProgress,
  Paper,
  useMediaQuery,
} from "@mui/material";

import SignUpImage from "src/assets/signup.svg";
import SignUpValidationSchema from "./signUp.schema";
import { signUpUser } from "./signUp.slice";
import { SIGN_UP_FIELDS } from "./constants";

const SignUp = () => {
  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state.signUp);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      type: "User",
    },
    validationSchema: SignUpValidationSchema,

    onSubmit: async (values) => {
      await dispatch(signUpUser(values))
        .then(() => {
          window.location.href = "/";
        })
        .catch((error) => {
          console.log("error");
        });
    },
  });
  const isMobile = useMediaQuery("(max-width:800px)");

  return (
    <Grid container spacing={2}>
      {!isMobile && (
        <Grid item xs={12} md={7}>
          <img src={SignUpImage} alt="sign-up" />
        </Grid>
      )}
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
          <Paper
            elevation={3}
            style={{
              padding: "20px",
              background: "#fbfbfb",
              border: "1px solid #ccc",
            }}
          >
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={3}>
                {Object.entries(SIGN_UP_FIELDS).map(([value, label], key) => (
                  <Grid key={key} item xs={12}>
                    <TextField
                      fullWidth
                      id={value}
                      name={value}
                      label={label}
                      type={
                        value === "password" ||
                        value === "password_confirmation"
                          ? "password"
                          : "text"
                      }
                      variant="outlined"
                      value={formik.values[value]}
                      onChange={formik.handleChange}
                      error={
                        formik.touched[value] && Boolean(formik.errors[value])
                      }
                      helperText={formik.touched[value] && formik.errors[value]}
                    />
                  </Grid>
                ))}
              </Grid>
              {isLoading ? (
                <CircularProgress />
              ) : (
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
              )}

              <Grid container justifyContent="center">
                <Typography
                  sx={{
                    mr: 1,
                  }}
                >
                  Have an account?
                </Typography>
                <Link style={{ marginTop: "2px" }} to="/" variant="body2">
                  Sign in
                </Link>
              </Grid>
            </Box>
          </Paper>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SignUp;
