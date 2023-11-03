import { configureStore } from "@reduxjs/toolkit";

import citiesReducer, { fetchCities } from "../cities.slice";

describe("citiesSlice", () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        cities: citiesReducer,
      },
    });
  });

  it("should handle fetchCities.pending", () => {
    store.dispatch(fetchCities());

    const { cities } = store.getState();

    expect(cities.fetching).toEqual(true);
  });

  it("should handle fetchCities.fulfilled", () => {
    const mockCitiesData = [{ name: "City 1" }, { name: "City 2" }];
    store.dispatch(fetchCities.fulfilled({ data: mockCitiesData }));

    const { cities } = store.getState();
    expect(cities.citiesData).toEqual(mockCitiesData);
  });

  it("should handle fetchCities.rejected", () => {
    const mockError = ["An error occurred"];
    store.dispatch(fetchCities.rejected(mockError));

    const { cities } = store.getState();
    expect(cities.isError).toBe(true);
  });

  it("should return the initial state if no action is provided", () => {
    const initialState = store.getState();
    expect(initialState).toEqual({
      cities: {
        citiesData: [],
        fetching: false,
        isSuccess: false,
        isError: false,
        error: null,
      },
    });
  });
});
