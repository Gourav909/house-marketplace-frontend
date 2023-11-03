import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import { getHeaders } from "src/config/headers";
import axiosClient from "src/config/axios";
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
  error: [],
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
      showErrorMessage(error.response.data);
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
      showErrorMessage(error.response.data);
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
      showErrorMessage(error.response.data);
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
      showErrorMessage(error.response.data);
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
        pendingState(state);
      })
      .addCase(fetchPropertyById.fulfilled, (state, action) => {
        fulfilledState(state);

        state.data = action.payload.data;
      })
      .addCase(fetchPropertyById.rejected, (state, action) => {
        rejectedState(state, action);
      })

      //handle addProperty
      .addCase(addProperty.pending, (state) => {
        pendingState(state);
      })
      .addCase(addProperty.fulfilled, (state, action) => {
        fulfilledState(state);
      })
      .addCase(addProperty.rejected, (state, action) => {
        rejectedState(state, action);
      })

      //handle updatePropertyById
      .addCase(updatePropertyById.pending, (state) => {
        pendingState(state);
      })
      .addCase(updatePropertyById.fulfilled, (state, action) => {
        fulfilledState(state);
      })
      .addCase(updatePropertyById.rejected, (state, action) => {
        rejectedState(state, action);
      })
      //handle deletePropertyById
      .addCase(deletePropertyById.pending, (state) => {
        pendingState(state);
      })
      .addCase(deletePropertyById.fulfilled, (state, action) => {
        fulfilledState(state);
      })
      .addCase(deletePropertyById.rejected, (state, action) => {
        rejectedState(state, action);
      });
  },
});

export default propertySlice.reducer;
