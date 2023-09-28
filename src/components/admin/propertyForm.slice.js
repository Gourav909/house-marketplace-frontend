import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import { getHeaders } from "src/config/headers";
import axiosClient from "src/config/axios";
import { PROPERTIES } from "src/constants/apiUrls";
import { showErrorMessage } from "src/utils/errorHandler";

const initialState = {
  data: {},
  isLoading: false,
  isSuccess: false,
  isError: false,
  error: null,
  isFetching: false,
};

export const addProperty = createAsyncThunk(
  "admin/addProperty",
  async (propertyData, thunkAPI) => {
    try {
      const { headers } = getHeaders(true);
      const response = await axiosClient.post(PROPERTIES, propertyData, {
        headers: headers,
      });
      const addedProperty = await response.data;
      toast.success("Property added successfully");
      return addedProperty;
    } catch (error) {
      showErrorMessage(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updatePropertyById = createAsyncThunk(
  "admin/updateProperty",

  async (data, thunkAPI) => {
    try {
      const { headers } = getHeaders(true);
      const { id, formData } = data;
      const response = await axiosClient.put(`${PROPERTIES}/${id}`, formData, {
        headers: headers,
      });
      const editedProperty = await response.data;
      toast.success("Property Updated successfully");
      return editedProperty;
    } catch (error) {
      showErrorMessage(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchPropertyById = createAsyncThunk(
  "admin/fetchPropertyById",
  async (id, thunkAPI) => {
    try {
      const { headers } = getHeaders();

      const response = await axiosClient.get(`${PROPERTIES}/${id}`, {
        headers: headers,
      });
      const property = await response.data;
      return property;
    } catch (error) {
      showErrorMessage(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deletePropertyById = createAsyncThunk(
  "admin/deletePropertyById",
  async (id, thunkAPI) => {
    try {
      const { headers } = getHeaders();

      const response = await axiosClient.delete(`${PROPERTIES}/${id}`, {
        headers: headers,
      });

      const success = await response.data.success;
      toast.success(response.data.data.message);
      return success;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const propertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //handle fetchPropertyById
      .addCase(fetchPropertyById.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isFetching = false;
      })
      .addCase(fetchPropertyById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isFetching = true;
        state.data = action.payload.data;
      })
      .addCase(fetchPropertyById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isFetching = false;
        state.error = action.payload.errors[0];
      })
      //handle addProperty
      .addCase(addProperty.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(addProperty.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(addProperty.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.error = action.payload.errors[0];
      })
      //handle updatePropertyById
      .addCase(updatePropertyById.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(updatePropertyById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(updatePropertyById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.error = action.payload.errors[0];
      })
      //handle deletePropertyById
      .addCase(deletePropertyById.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(deletePropertyById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(deletePropertyById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.error = action.payload.errors[0];
      });
  },
});

export default propertySlice.reducer;
