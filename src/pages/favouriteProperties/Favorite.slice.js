import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "src/config/axios";
import { getHeaders } from "src/config/headers";
import { FAVOURITE_PROPERTIES } from "src/constants/apiUrls";
import { showErrorMessage } from "src/utils/errorHandler";
import {
  fulfilledState,
  pendingState,
  rejectedState,
} from "src/utils/commonSlices/mockSlice";

const initialState = {
  data: [],
  paginationData: {},
  isLoading: false,
  isSuccess: false,
  isError: false,
  error: [],
};

export const fetchFavoriteProperties = createAsyncThunk(
  "favoriteProperties/fetch",
  async (value, thunkAPI) => {
    let route = `${FAVOURITE_PROPERTIES}?page=${value}`;
    try {
      const { headers } = getHeaders();
      const response = await axiosClient.get(route, {
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

export const addFavoriteProperty = createAsyncThunk(
  "favoriteProperties/add",
  async (value, thunkAPI) => {
    try {
      const { headers } = getHeaders();
      const response = await axiosClient.post(FAVOURITE_PROPERTIES, value, {
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

export const deleteFavoriteProperty = createAsyncThunk(
  "favoriteProperties/delete",
  async (id, thunkAPI) => {
    try {
      const { headers } = getHeaders();
      const response = await axiosClient.delete(
        `${FAVOURITE_PROPERTIES}/${id}`,
        {
          headers: headers,
        }
      );
      const data = await response.data;
      return { data, id };
    } catch (error) {
      showErrorMessage(error.response.data);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const favoritePropertiesSlice = createSlice({
  name: "favoriteProperties",
  initialState,
  reducers: {
    updateFavouritePagePropeties: (state, action) => {
      state.data = [...state.data].filter(
        (item) => item.id !== action.payload.id
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavoriteProperties.pending, (state) => {
        pendingState(state);
      })
      .addCase(fetchFavoriteProperties.fulfilled, (state, action) => {
        fulfilledState(state);
        state.data = action.payload.data.properties;
        state.paginationData = action.payload.meta;
      })
      .addCase(fetchFavoriteProperties.rejected, (state, action) => {
        rejectedState(state, action);
      })
      .addCase(addFavoriteProperty.pending, (state) => {
        pendingState(state);
      })
      .addCase(addFavoriteProperty.fulfilled, (state, action) => {
        fulfilledState(state);
        state.data.push(action.payload);
      })
      .addCase(addFavoriteProperty.rejected, (state, action) => {
        rejectedState(state, action);
      })
      .addCase(deleteFavoriteProperty.pending, (state) => {
        pendingState(state);
      })
      .addCase(deleteFavoriteProperty.fulfilled, (state, action) => {
        fulfilledState(state);
        state.data = state.data.filter((item) => item.id !== action.payload.id);
      })
      .addCase(deleteFavoriteProperty.rejected, (state, action) => {
        rejectedState(state, action);
      });
  },
});
export const { updateFavouritePagePropeties } = favoritePropertiesSlice.actions;
export default favoritePropertiesSlice.reducer;
