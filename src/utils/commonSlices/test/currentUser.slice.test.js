import { configureStore } from "@reduxjs/toolkit";

import currentUserReducer, {
  getCurrentUser,
} from "../currentUser.slice";

describe("currentUserSlice", () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        currentUser: currentUserReducer,
      },
    });
  });

  it("should handle getCurrentUser.pending", () => {
    store.dispatch(getCurrentUser());

    const { currentUser } = store.getState();
    expect(currentUser.fetching).toEqual(true);
  });

  it("should handle getCurrentUser.fulfilled", () => {
    const mockCurrentUserDetails = {
      username: "user1",
      email: "user1@example.com",
    };

    store.dispatch(getCurrentUser.fulfilled({ data: mockCurrentUserDetails }));

    const { currentUser } = store.getState();
    expect(currentUser.currentUserDetails).toEqual(mockCurrentUserDetails);
  });

  it("should handle getCurrentUser.rejected", () => {
    const mockError = { message: "An error occurred" };

    store.dispatch(getCurrentUser.rejected(mockError));

    const { currentUser } = store.getState();
    expect(currentUser.isError).toBe(true);
  });

  it("should return the initial state if no action is provided", () => {
    const initialState = store.getState();
    expect(initialState).toEqual({
      currentUser: {
        currentUserDetails: {},
        fetching: false,
        isSuccess: false,
        isError: false,
        error: null,
      },
    });
  });
});
