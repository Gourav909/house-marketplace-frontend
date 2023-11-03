import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axiosClient from "src/config/axios";
import { getHeaders } from "src/config/headers";
import { PROPERTIES } from "src/constants/apiUrls";
import { showErrorMessage, getErrorMessage } from "src/utils/errorHandler";
import {
  fulfilledState,
  pendingState,
  rejectedState,
} from "src/utils/commonSlices/mockSlice";

const initialState = {
  properties: [],
  paginationData: {},
  fetching: false,
  isSuccess: false,
  isError: false,
  error: [],
};

export const fetchProperties = createAsyncThunk(
  "/fetchProperties",
  async (data, thunkAPI) => {
    let route;
    const queryParams = `page=${data.currentPage}&search=${data.query}`;
    const queryData = data.query.length;
    const filterUrl = data.filter;
    if (filterUrl || queryData === 0) {
      route = `${PROPERTIES}?${filterUrl || `page=${data.currentPage}`}`;
    } else {
      route = `${PROPERTIES}?${queryParams}`;
    }

    try {
      const { headers } = getHeaders();
      const response = await axiosClient.get(route, {
        headers: headers,
      });
      const properties = await response.data;
      return properties;
    } catch (error) {
      showErrorMessage(error.response.data);
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
        pendingState(state);
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        fulfilledState(state);
        state.properties = action.payload.data.properties;
        state.paginationData = action.payload.meta;
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.fetching = false;
        state.isError = true;
        state.isSuccess = false;
        state.error = getErrorMessage(action.payload);
        rejectedState(state, action);
      });
  },
});

export const { updateDashboardFavPropeties } = propertiesSlice.actions;

export default propertiesSlice.reducer;
