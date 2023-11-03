import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import { getCurrentUser } from "src/utils/commonSlices/currentUser.slice";
import App from "./App";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  Link: jest.fn().mockImplementation(({ children }) => children),
}));

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const initialState = {
  properties: {
    properties: [],
    paginationData: {},
    fetching: false,
  },
  login: {
    isSuccess: false,
    isError: false,
    isLoading: false,
    data: null,
  },
};

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

describe("App Component", () => {
  let store;
  beforeEach(() => {
    store = mockStore(initialState);
  });

  test("App component should rendered without error", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });

  test("dispatches getCurrentUser when currentUser exists", () => {
    const currentUser = "some_user";
    localStorage.setItem("currentUser", currentUser);
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    store.dispatch(getCurrentUser());
  });
});
