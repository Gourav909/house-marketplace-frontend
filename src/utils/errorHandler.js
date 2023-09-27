import { toast } from "react-toastify";

export const showErrorMessage = (errorObj) => {
  let errorMessage = "Some error occurred!";
  let responseData = errorObj.response;
  if (typeof responseData.data.errors[0] === "string") {
    errorMessage = responseData.data.errors[0];
  } else {
    errorMessage = responseData.statusText;
  }
  toast.error(errorMessage);
};
