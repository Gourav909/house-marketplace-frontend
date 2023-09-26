import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../config/axios";
import { SIGN_UP } from "../../constants/apiUrls";

const initialState = {
  data: {},
  isLoading: false,
  isSuccess: false,
  isError: false,
  error: null,
};

export const signUpUser = createAsyncThunk(
  "auth/signUpUser",
  async (user, thunkAPI) => {
    try {
      let response = await axiosClient.post(SIGN_UP, { ...user });
      let data = await response.data;
      if (data) {
        return data;
      }
    } catch (error) {
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
      state.isLoading = true;
    });
    builder.addCase(signUpUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.data = action.payload;
    });
    builder.addCase(signUpUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.error = action.payload.error;
    });
  },
});

export const { clearState } = signUpSlice.actions;
export default signUpSlice.reducer;
