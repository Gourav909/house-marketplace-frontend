import { configureStore } from "@reduxjs/toolkit";

import loginReducer, {
  loginUser,
  clearState,
} from "src/pages/login/login.slice";

jest.mock("src/config/axios", () => ({
  post: jest.fn(),
}));

jest.mock("src/config/headers", () => ({
  getHeaders: jest.fn(),
}));
jest.mock("src/constants/apiUrls", () => "auth/sign_in");

describe("user slice", () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        user: loginReducer,
      },
    });
  });

  it("should handle a loginUser.panding state", () => {
    store.dispatch(loginUser());
    const { user } = store.getState();
    expect(user.isLoading).toBe(true);
    expect(user.isSuccess).toBe(false);
  });

  it("should handle a successful user login", () => {
    const mockUserData = { id: 1, name: "John Doe" };
    store.dispatch(loginUser.fulfilled(mockUserData));

    const { user } = store.getState();

    expect(user.isSuccess).toBe(true);
    expect(user.isError).toBe(false);
    expect(user.data).toEqual(mockUserData);
  });

  it("should handle a failed user data fetch", () => {
    const mockError = "An error occurred";

    store.dispatch(loginUser.rejected(mockError));
    const { user } = store.getState();
    expect(user.isSuccess).toBe(false);
    expect(user.isError).toBe(true);
  });

  it("should handle clearing the state", () => {
    store.dispatch(clearState());

    const { user } = store.getState();

    const expectedState = {
      data: {},
      isLoading: false,
      isSuccess: false,
      isError: false,
      error: null,
    };

    expect(user).toEqual(expectedState);
  });
});
