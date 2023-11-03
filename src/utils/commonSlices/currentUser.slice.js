import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getHeaders } from "src/config/headers";
import axiosClient from "src/config/axios";
import { CURRENT_USER } from "src/constants/apiUrls";
import { showErrorMessage } from "src/utils/errorHandler";
import {
  fulfilledState,
  pendingState,
  rejectedState,
} from "src/utils/commonSlices/mockSlice";
const initialState = {
  currentUserDetails: {},
  fetching: false,
  isSuccess: false,
  isError: false,
  error: null,
};

export const getCurrentUser = createAsyncThunk(
  "/getCurrentUser",
  async (_, thunkAPI) => {
    try {
      const { headers } = getHeaders();
      const response = await axiosClient.get(CURRENT_USER, {
        headers: headers,
      });
      const data = await response.data;
      return data;
    } catch (error) {
      showErrorMessage(error.response.data);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentUser.pending, (state) => {
        pendingState(state);
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        fulfilledState(state);
        state.currentUserDetails = action.payload.data;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        rejectedState(state, action);
      });
  },
});

export default currentUserSlice.reducer;
