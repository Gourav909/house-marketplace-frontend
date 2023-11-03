import { configureStore } from "@reduxjs/toolkit";

import signUpReducer, {
  signUpUser,
  clearState,
} from "src/pages/signUp/signUp.slice";

describe("login user slice", () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        user: signUpReducer,
      },
    });
  });

  it("should handle signUpUser.panding state", () => {
    store.dispatch(signUpUser());
    const { user } = store.getState();
    expect(user.isLoading).toEqual(true);
  });

  it("should handle signUpUser.fulfilled state", () => {
    const userData = { id: 1, username: "exampleUser" };
    store.dispatch(signUpUser.fulfilled(userData));
    const { user } = store.getState();
    expect(user.data).toEqual(userData);
  });

  it("should handle signUpUser.rejected state", () => {
    store.dispatch(signUpUser.rejected("error"));
    const { user } = store.getState();
    expect(user.isError).toBe(true);
  });

  it("should handle clearState state", () => {
    store.dispatch(clearState());
    const { user } = store.getState();
    expect(user).toEqual({
      data: {},
      isLoading: false,
      isSuccess: false,
      isError: false,
      error: [],
    });
  });
});
