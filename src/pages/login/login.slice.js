import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axiosClient from "src/config/axios";
import { getHeaders } from "src/config/headers";
import { LOGIN } from "src/constants/apiUrls";
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
  error: null,
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (user, thunkAPI) => {
    try {
      const { headers: requestHeaders } = getHeaders();
      let response = await axiosClient.post(
        LOGIN,
        { ...user },
        { headers: requestHeaders }
      );
      const { headers: responseHeaders, data } = response;
      const userType = data?.data.type;

      if (data) {
        localStorage.setItem(
          "currentUser",
          btoa(
            JSON.stringify({
              "access-token": responseHeaders["access-token"],
              client: responseHeaders["client"],
              uid: responseHeaders["uid"],
              userType: userType,
            })
          )
        );
        return data;
      }
    } catch (error) {
      showErrorMessage(error.response.data);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    clearState: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      pendingState(state);
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      fulfilledState(state);
      state.data = action.payload;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      rejectedState(state, action);
    });
  },
});

export const { clearState } = loginSlice.actions;
export default loginSlice.reducer;
