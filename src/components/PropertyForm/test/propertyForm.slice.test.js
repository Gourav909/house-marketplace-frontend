import { configureStore } from "@reduxjs/toolkit";

import propertyReducer, {
  addProperty,
  updatePropertyById,
  fetchPropertyById,
  deletePropertyById,
} from "src/components/PropertyForm/propertyForm.slice";
import { MOCKPROPERTY } from "src/test/jest/_mocks_/mockProperties";
import axiosClient from "src/config/axios";

describe("propertySlice", () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        property: propertyReducer,
      },
    });
  });

  it("should handle addProperty.pending", () => {
    store.dispatch(addProperty());

    const { property } = store.getState();
    expect(property.isLoading).toBe(true);
    expect(property.isError).toBe(false);
  });

  it("should handle addProperty.fulfilled", () => {
    store.dispatch(addProperty.fulfilled());

    const { property } = store.getState();
    expect(property.isError).toBe(false);
    expect(property.isSuccess).toBe(true);
  });

  it("should handle addProperty.rejected", () => {
    const mockError = {
      errors: ["errror"],
    };
    store.dispatch(addProperty.rejected(mockError));

    const { property } = store.getState();
    expect(property.isError).toBe(true);
    expect(property.isSuccess).toBe(false);
  });

  it("should handle updatePropertyById.pending", () => {
    store.dispatch(updatePropertyById());

    const { property } = store.getState();
    expect(property.isLoading).toBe(true);
    expect(property.isError).toBe(false);
  });

  it("should handle updatePropertyById.fulfilled", () => {
    store.dispatch(updatePropertyById.fulfilled());

    const { property } = store.getState();
    expect(property.isError).toBe(false);
    expect(property.isSuccess).toBe(true);
  });

  it("should handle updatePropertyById.rejected", () => {
    const mockError = { message: "An error occurred" };
    store.dispatch(updatePropertyById.rejected(mockError));

    const { property } = store.getState();
    expect(property.isLoading).toBe(false);
    expect(property.isError).toBe(true);
    expect(property.isSuccess).toBe(false);
  });

  it("should handle fetchPropertyById.pending", () => {
    store.dispatch(fetchPropertyById());

    const { property } = store.getState();
    expect(property.isLoading).toBe(true);
    expect(property.isError).toBe(false);
    expect(property.isSuccess).toBe(false);
  });

  it("should handle fetchPropertyById.fulfilled", () => {
    const mockCurrentUserDetails = MOCKPROPERTY[0];

    store.dispatch(
      fetchPropertyById.fulfilled({ data: mockCurrentUserDetails })
    );

    const { property } = store.getState();
    expect(property.isLoading).toBe(false);
    expect(property.isError).toBe(false);
    expect(property.data).toEqual(mockCurrentUserDetails);
  });

  it("should handle fetchPropertyById.rejected", () => {
    const mockError = { message: "An error occurred" };
    store.dispatch(fetchPropertyById.rejected(mockError));

    const { property } = store.getState();
    expect(property.isLoading).toBe(false);
    expect(property.isError).toBe(true);
    expect(property.isSuccess).toBe(false);
  });

  it("should handle deletePropertyById.pending", () => {
    store.dispatch(deletePropertyById());

    const { property } = store.getState();
    expect(property.isLoading).toBe(true);
    expect(property.isError).toBe(false);
    expect(property.isSuccess).toBe(false);
  });

  it("should handle deletePropertyById.fulfilled", () => {
    store.dispatch(deletePropertyById.fulfilled());

    const { property } = store.getState();
    expect(property.isLoading).toBe(false);
    expect(property.isError).toBe(false);
    expect(property.isSuccess).toBe(true);
  });

  it("should handle deletePropertyById.rejected", () => {
    const mockError = { message: "An error occurred" };
    store.dispatch(deletePropertyById.rejected(mockError));

    const { property } = store.getState();
    expect(property.isLoading).toBe(false);
    expect(property.isError).toBe(true);
    expect(property.isSuccess).toBe(false);
  });

  it("should return the initial state if no action is provided", () => {
    const initialState = store.getState();
    expect(initialState).toEqual({
      property: {
        data: {},
        isLoading: false,
        isSuccess: false,
        isError: false,
        error: [],
        isFetching: false,
      },
    });
  });

  it("should handle addProperty.fulfilled", async () => {
    const fakeResponse = {
      data: {
        id: 1,
        title: "type1",
      },
    };
    axiosClient.post = jest.fn().mockResolvedValue(fakeResponse);

    await store.dispatch(addProperty(fakeResponse));
    axiosClient.post = jest.fn().mockResolvedValue(fakeResponse);
    const actions = store.getState();
    await expect(actions.property.isSuccess).toBe(true);
    await expect(actions.property.isError).toBe(false);
  });
});
