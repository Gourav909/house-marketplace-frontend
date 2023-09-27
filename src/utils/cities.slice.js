import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getHeaders } from "src/config/headers";
import axiosClient from "src/config/axios";
import { FETCH_CITIES } from "src/constants/apiUrls";

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
        state.fetching = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.fetching = false;
        state.isError = false;
        state.isSuccess = true;
        state.citiesData = action.payload.data;
      })
      .addCase(fetchCities.rejected, (state, action) => {
        state.fetching = false;
        state.isError = true;
        state.isSuccess = false;
        state.error = action.payload.error[0];
      });
  },
});

export default citiesSlice.reducer;
