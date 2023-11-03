import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axiosClient from "src/config/axios";
import { getHeaders } from "src/config/headers";
import { PROPERTIES } from "src/constants/apiUrls";
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

export const fetchPropertyDetail = createAsyncThunk(
  "user/PropertyDetail",
  async (id, thunkAPI) => {
    try {
      const { headers } = getHeaders();

      let response = await axiosClient.get(`${PROPERTIES}/${id}`, {
        headers: headers,
      });
      let data = await response.data;
      return data;
    } catch (error) {
      showErrorMessage(error.response.data);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const propertyDetailSlice = createSlice({
  name: "propertyDetail",
  initialState,
  reducers: {
    clearState: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPropertyDetail.pending, (state) => {
      pendingState(state);
    });
    builder.addCase(fetchPropertyDetail.fulfilled, (state, action) => {
      fulfilledState(state);
      state.data = action.payload.data;
    });
    builder.addCase(fetchPropertyDetail.rejected, (state, action) => {
      rejectedState(state, action);
    });
  },
});

export const { clearState } = propertyDetailSlice.actions;
export default propertyDetailSlice.reducer;
