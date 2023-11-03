import { toast } from "react-toastify";

export const showErrorMessage = (errorObj) => {
  const errorMessage = getErrorMessage(errorObj);
  toast.error(errorMessage);
};

export const getErrorMessage = (errorObj) => {
  const errorMessage = "Some error occurred!";

  if (typeof errorObj?.errors[0] === "string") {
    return errorObj?.errors[0];
  } else {
    return errorObj?.errors?.full_messages[0] || errorMessage;
  }
};
