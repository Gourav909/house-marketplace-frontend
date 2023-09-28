import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axiosClient from "src/config/axios";
import { getHeaders } from "src/config/headers";
import { PROPERTIES } from "src/constants/apiUrls";

const initialState = {
  properties: [],
  paginationData: {},
  fetching: false,
  isSuccess: false,
  isError: false,
  error: null,
};

export const fetchProperties = createAsyncThunk(
  "/fetchProperties",
  async (data, thunkAPI) => {
    let route = data ? `${PROPERTIES}?${data}` : PROPERTIES;

    try {
      const { headers } = getHeaders();
      const response = await axiosClient.get(route, {
        headers: headers,
      });
      const properties = await response.data;
      return properties;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const propertiesSlice = createSlice({
  name: "properties",
  initialState,
  reducers: {
    updateDashboardFavPropeties: (state, action) => {
      state.properties = [...state.properties].map((item) => {
        if (item.id === action.payload.id) {
          item["is_favourite"] = action.payload.is_favourite;
          return item;
        }
        return item;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProperties.pending, (state) => {
        state.fetching = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.fetching = false;
        state.isError = false;
        state.isSuccess = true;
        state.properties = action.payload.data.properties;
        state.paginationData = action.payload.meta;
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.fetching = false;
        state.isError = true;
        state.isSuccess = false;
        // state.error = action.payload.error[0];
      });
  },
});

export const { updateDashboardFavPropeties } = propertiesSlice.actions;

export default propertiesSlice.reducer;
