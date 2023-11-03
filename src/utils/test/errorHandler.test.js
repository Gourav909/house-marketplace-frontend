import { toast } from "react-toastify";

import { showErrorMessage, getErrorMessage } from "../errorHandler";

jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
  },
}));

describe("showErrorMessage function", () => {
  it("should show an error toast with the error message", () => {
    const errorObj = {
      errors: ["Sample error message"],
    };

    showErrorMessage(errorObj);
    expect(toast.error).toHaveBeenCalledWith("Sample error message");
  });
});

describe("getErrorMessage function", () => {
  it("should return the first error message when it is a string", () => {
    const errorObj = {
      errors: ["Sample error message"],
    };

    const errorMessage = getErrorMessage(errorObj);
    expect(errorMessage).toEqual("Sample error message");
  });

  it("should return the first error message from full_messages when it is an array", () => {
    const errorObj = {
      errors: {
        full_messages: ["Error 1", "Error 2"],
      },
    };

    const errorMessage = getErrorMessage(errorObj);
    expect(errorMessage).toEqual("Error 1");
  });
});
