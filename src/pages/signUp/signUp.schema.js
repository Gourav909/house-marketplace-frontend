import { string, ref, object  } from "yup";

const SignUpValidationSchema = object({
  name: string().required("Name is required"),
  email: string()
    .email("Invalid email address")
    .required("Email is required"),
  password: string().required("Password is required")
  .matches(
    // eslint-disable-next-line
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
  ),
  password_confirmation: string()
    .oneOf([ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

export default SignUpValidationSchema;
