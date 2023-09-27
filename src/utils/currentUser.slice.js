import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getHeaders } from "src/config/headers";
import axiosClient from "src/config/axios";
import { CURRENT_USER } from "src/constants/apiUrls";

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
        state.fetching = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.fetching = false;
        state.isError = false;
        state.isSuccess = true;
        state.currentUserDetails = action.payload.data;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.fetching = false;
        state.isError = true;
        state.isSuccess = false;
        state.error = action.payload.error[0];
      });
  },
});

export default currentUserSlice.reducer;
