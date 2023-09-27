import { string, object } from "yup";

export const LoginValidationSchema = object({
  email: string().required("Email is required").email("Invalid Email"),
  password: string().required("Password is required"),
});
