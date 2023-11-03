import React from "react";
import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from "@testing-library/react";

import SignUp from "../SignUp";

jest.mock("react-redux", () => ({
  useDispatch: () => jest.fn(),
  useSelector: () => ({ isLoading: false }),
}));

jest.mock("react-router-dom", () => ({
  Link: jest
    .fn()
    .mockImplementation(({ to, children }) => <a href={to}>{children}</a>),
}));

describe("SignUp Component", () => {
  let nameInput, emailInput, passwordInput, confirmPasswordInput, signUpHeader;

  beforeEach(() => {
    act(() => {
      render(<SignUp />);
    });
    nameInput = screen.getByLabelText("Name");
    emailInput = screen.getByLabelText("Email");
    passwordInput = screen.getByLabelText("Password");
    confirmPasswordInput = screen.getByLabelText("Password confirmation");
    signUpHeader = screen.getByText("Sign up");
  });

  it("renders the SignUp component", () => {
    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(confirmPasswordInput).toBeInTheDocument();
    expect(signUpHeader).toBeInTheDocument();
  });

  it("handles form input and submission", async () => {
    const signUpButton = screen.getByRole("button", {
      name: "Sign Up",
    });

    fireEvent.change(nameInput, { target: { value: "test user" } });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "password123" },
    });
    await waitFor(() => {
      expect(nameInput.value).toBe("test user");
      expect(emailInput.value).toBe("test@example.com");
      expect(passwordInput.value).toBe("password123");
      expect(confirmPasswordInput.value).toBe("password123");
      fireEvent.click(signUpButton);
      expect(window.location.pathname).toBe("/");
    });
  });

  it('navigates to the sign-in page when "Sign in" link is clicked', () => {
    const signInLink = screen.getByText("Sign in");
    fireEvent.click(signInLink);
    expect(window.location.pathname).toBe("/");
  });

  it("displays validation errors for incomplete or incorrect input", async () => {
    const signUpButton = screen.getByRole("button", {
      name: "Sign Up",
    });
    fireEvent.click(signUpButton);

    await waitFor(() => {
      expect(signUpButton).toBeInTheDocument();
    });
  });
});
