import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import axiosClient from "src/config/axios";
import { SIGN_UP } from "src/constants/apiUrls";
import { showErrorMessage } from "src/utils/errorHandler";
import {
  fulfilledState,
  pendingState,
  rejectedState,
} from "src/utils/commonSlices/mockSlice";

const initialState = {
  data: {},
  isLoading: false,
  isSuccess: false,
  isError: false,
  error: [],
};

export const signUpUser = createAsyncThunk(
  "auth/signUpUser",
  async (user, thunkAPI) => {
    try {
      let response = await axiosClient.post(SIGN_UP, { ...user });
      let data = await response.data;
      if (data) {
        toast.success("SignUp successfully");
        return data;
      }
    } catch (error) {
      showErrorMessage(error.response.data);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const signUpSlice = createSlice({
  name: "signUp",
  initialState,
  reducers: {
    clearState: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(signUpUser.pending, (state) => {
      pendingState(state);
      state.isLoading = true;
    });
    builder.addCase(signUpUser.fulfilled, (state, action) => {
      fulfilledState(state);
      state.data = action.payload;
    });
    builder.addCase(signUpUser.rejected, (state, action) => {
      rejectedState(state, action);
    });
  },
});

export const { clearState } = signUpSlice.actions;
export default signUpSlice.reducer;
