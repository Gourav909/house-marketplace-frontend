import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "src/config/axios";
import { getHeaders } from "src/config/headers";
import { FAVOURITE_PROPERTIES } from "src/constants/apiUrls";

const initialState = {
  data: [],
  paginationData: {},
  isLoading: false,
  isSuccess: false,
  isError: false,
  error: null,
};

export const fetchFavoriteProperties = createAsyncThunk(
  "favoriteProperties/fetch",
  async (_, thunkAPI) => {
    try {
      const { headers } = getHeaders();
      const response = await axiosClient.get(FAVOURITE_PROPERTIES, {
        headers: headers,
      });
      const data = await response.data;
      return data;
    } catch (error) {
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
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const favoritePropertiesSlice = createSlice({
  name: "favoriteProperties",
  initialState,
  reducers: {
    updateFavouritePagePropeties: (state, action) => {
      state.data = [...state.data].filter((item) => item.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavoriteProperties.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.error = null;
      })
      .addCase(fetchFavoriteProperties.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload.data.properties;
        state.paginationData = action.payload.meta;
      })
      .addCase(fetchFavoriteProperties.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      })
      .addCase(addFavoriteProperty.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
        state.error = null;
      });
  },
});
export const { updateFavouritePagePropeties } = favoritePropertiesSlice.actions;
export default favoritePropertiesSlice.reducer;
