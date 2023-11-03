import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getHeaders } from "src/config/headers";
import axiosClient from "src/config/axios";
import { FETCH_CITIES } from "src/constants/apiUrls";
import { showErrorMessage } from "src/utils/errorHandler";
import {
  fulfilledState,
  pendingState,
  rejectedState,
} from "src/utils/commonSlices/mockSlice";
const initialState = {
  citiesData: [],
  fetching: false,
  isSuccess: false,
  isError: false,
  error: null,
};

export const fetchCities = createAsyncThunk(
  "/fetchCities",
  async (_, thunkAPI) => {
    try {
      const { headers } = getHeaders();
      const response = await axiosClient.get(FETCH_CITIES, {
        headers: headers,
      });
      const cities = await response.data;
      return cities;
    } catch (error) {
      showErrorMessage(error.response.data);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const citiesSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCities.pending, (state) => {
        pendingState(state);
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        fulfilledState(state);
        state.citiesData = action.payload.data;
      })
      .addCase(fetchCities.rejected, (state, action) => {
        rejectedState(state, action);
      });
  },
});

export default citiesSlice.reducer;
