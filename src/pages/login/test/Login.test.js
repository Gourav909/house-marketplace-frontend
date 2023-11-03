import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import LoginPage from "../Login";

describe("LoginPage Component", () => {
  const mockStore = configureStore([]);
  let emailInput, passwordInput;
  let store = mockStore({
    login: {
      isSuccess: false,
      isError: false,
      isLoading: false,
      data: null,
    },
  });
  const renderLogin = () =>
    render(
      <Provider store={store}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </Provider>
    );
  it("LoginPage renders correctly", () => {
    renderLogin();
    emailInput = screen.getByTestId("email-input");
    passwordInput = screen.getByTestId("password-input");
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  it("Submitting the form triggers loginUser action", async () => {
    renderLogin();
    store.dispatch = jest.fn();

    emailInput = screen.getByTestId("email-input");
    passwordInput = screen.getByTestId("password-input");

    const email = emailInput.querySelector("input");
    const password = passwordInput.querySelector("input");

    fireEvent.change(email, { target: { value: "test@example.com" } });
    fireEvent.change(password, { target: { value: "password@123" } });

    const loginButton = screen.getByRole("button", { name: "Login" });

    fireEvent.click(loginButton);
    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledTimes(1);
    });
  });

  it("navigates to the dashboard after successful login", async () => {
    store = mockStore({
      login: {
        isSuccess: true,
        isError: false,
        isLoading: false,
        data: {
          data: {
            type: "Admin",
          },
        },
      },
    });
    renderLogin();
    expect(window.location.pathname).toBe("/dashboard");
  });

  it("handles errors and clears state after an unsuccessful login", async () => {
    store = mockStore({
      login: {
        isSuccess: false,
        isError: true,
        isLoading: false,
        data: null,
      },
    });
    renderLogin();
    expect(window.location.pathname).toBe("/");
  });
});
