import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axiosClient from "src/config/axios";
import { getHeaders } from "src/config/headers";
import { PROPERTIES } from "src/constants/apiUrls";

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
      state.isLoading = true;
    });
    builder.addCase(fetchPropertyDetail.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.data = action.payload.data;
    });
    builder.addCase(fetchPropertyDetail.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
      state.error = action.payload.error[0];
    });
  },
});

export const { clearState } = propertyDetailSlice.actions;
export default propertyDetailSlice.reducer;
