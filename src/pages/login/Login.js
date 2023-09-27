import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import {
  TextField,
  Button,
  Box,
  Grid,
  Typography,
  CircularProgress,
  Paper,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import LoginImage from "src/assets/login.svg";
import { LoginValidationSchema } from "./login.schema";
import { loginUser, clearState } from "./login.slice";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isSuccess, isError, isLoading, data } = useSelector(
    (state) => state.login
  );

  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: LoginValidationSchema,

      onSubmit: (values) => {
        dispatch(loginUser({ ...values }));
      },
    });

  useEffect(() => {
    if (isSuccess) {
      const { type: userRole } = data.data;
      navigate("/dashboard", {
        replace: true,
        state: { isEditable: userRole === "Admin" ? true : false },
      });
    } else if (isError) {
      navigate("/");
      dispatch(clearState());
    }
  }, [isSuccess, isError]);

  return (
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

              <Link style={{ marginTop: "2px" }} to="/sign-up" variant="body2">
                Sign up
              </Link>
            </Grid>
          </Paper>
        </Box>
      </Grid>
    </Grid>
  );
};
export default React.memo(LoginPage);
