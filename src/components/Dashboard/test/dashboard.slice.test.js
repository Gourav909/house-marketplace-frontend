import { configureStore } from "@reduxjs/toolkit";

import propertiesReducer, {
  fetchProperties,
  updateDashboardFavPropeties,
} from "src/components/Dashboard/dashboard.slice";
import { MOCKPROPERTY, MOCKPAGINATIONDATA } from "src/test/jest/_mocks_/mockProperties";

describe("propertiesSlice", () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        properties: propertiesReducer,
      },
    });
  });

  it("should handle fetchProperties.pending", () => {
    store.dispatch(fetchProperties());

    const { properties } = store.getState();
    expect(properties.fetching).toBe(true);
    expect(properties.isError).toBe(false);
    expect(properties.isSuccess).toBe(false);
  });

  it("should handle fetchProperties.fulfilled", () => {
    const mockData = {
      data: {
        properties: MOCKPROPERTY,
      },
      meta: MOCKPAGINATIONDATA,
    };
    store.dispatch(fetchProperties.fulfilled(mockData));

    const { properties } = store.getState();

    expect(properties.isSuccess).toBe(true);
    expect(properties.properties).toEqual(mockData.data.properties);
    expect(properties.paginationData).toEqual(mockData.meta);
  });

  it("should handle fetchProperties.rejected", () => {
    const mockError = { message: "An error occurred" };

    store.dispatch(fetchProperties.rejected(mockError));

    const { properties } = store.getState();
    expect(properties.isError).toBe(true);
    expect(properties.isSuccess).toBe(false);
  });

  it("should update 'is_favourite' key of a property in the state", () => {
    const initialState = {
      properties: [
        { id: 1, is_favourite: false },
        { id: 2, is_favourite: true },
      ],
    };

    const action = updateDashboardFavPropeties({ id: 1, is_favourite: true });
    const mockResult = [
      { id: 1, is_favourite: true },
      { id: 2, is_favourite: true },
    ];
    const state = propertiesReducer(initialState, action);
    expect(state.properties).toEqual(mockResult);
  });

  it("should handle the case when the property to update is not found", () => {
    const initialState = {
      properties: [{ id: 2, is_favourite: true }],
    };

    const action = updateDashboardFavPropeties({ id: 1, is_favourite: true });
    const newState = propertiesReducer(initialState, action);
    expect(newState.properties).toEqual(initialState.properties);
  });

  it("should return the initial state if no action is provided", () => {
    const initialState = store.getState();
    expect(initialState).toEqual({
      properties: {
        properties: [],
        paginationData: {},
        fetching: false,
        isSuccess: false,
        isError: false,
        error: [],
      },
    });
  });
});
