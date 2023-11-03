import { configureStore } from "@reduxjs/toolkit";

import favoritePropertiesReducer, {
  fetchFavoriteProperties,
  addFavoriteProperty,
  deleteFavoriteProperty,
  updateFavouritePagePropeties,
} from "src/pages/favouriteProperties/Favorite.slice";

describe("favoritePropertiesSlice", () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        favoriteProperties: favoritePropertiesReducer,
      },
    });
  });

  it("should handle fetchFavoriteProperties.pending", () => {
    store.dispatch(fetchFavoriteProperties());

    const { favoriteProperties } = store.getState();
    expect(favoriteProperties.isLoading).toBe(true);
    expect(favoriteProperties.isSuccess).toBe(false);
  });

  it("should handle fetchFavoriteProperties.fulfilled", () => {
    const mockData = {
      data: {
        properties: [{ id: 1, name: "Property 1" }],
      },
      meta: { total: 1 },
    };

    store.dispatch(fetchFavoriteProperties.fulfilled(mockData));

    const { favoriteProperties } = store.getState();
    expect(favoriteProperties.isLoading).toBe(false);
    expect(favoriteProperties.isSuccess).toBe(true);
    expect(favoriteProperties.data).toEqual(mockData.data.properties);
    expect(favoriteProperties.paginationData).toEqual(mockData.meta);
  });

  it("should handle fetchFavoriteProperties.rejected", () => {
    const mockError = { message: "An error occurred" };

    store.dispatch(fetchFavoriteProperties.rejected(mockError));

    const { favoriteProperties } = store.getState();
    expect(favoriteProperties.isLoading).toBe(false);
    expect(favoriteProperties.isError).toBe(true);
  });

  it("should handle addFavoriteProperty.pending", () => {
    store.dispatch(addFavoriteProperty());

    const { favoriteProperties } = store.getState();
    expect(favoriteProperties.isLoading).toBe(true);
    expect(favoriteProperties.isSuccess).toBe(false);
  });

  it("should handle addFavoriteProperty.fulfilled", () => {
    store.dispatch(addFavoriteProperty.fulfilled());

    const { favoriteProperties } = store.getState();
    expect(favoriteProperties.isLoading).toBe(false);
    expect(favoriteProperties.isSuccess).toBe(true);
  });

  it("should handle addFavoriteProperty.rejected", () => {
    const mockError = { message: "An error occurred" };
    store.dispatch(addFavoriteProperty.rejected(mockError));

    const { favoriteProperties } = store.getState();

    expect(favoriteProperties.isError).toBe(true);
    expect(favoriteProperties.isSuccess).toBe(false);
  });

  it("should handle deleteFavoriteProperty.pending", () => {
    store.dispatch(deleteFavoriteProperty(1));

    const { favoriteProperties } = store.getState();
    expect(favoriteProperties.isLoading).toBe(true);
    expect(favoriteProperties.isSuccess).toBe(false);
  });

  it("should handle deleteFavoriteProperty.pending", () => {
    store.dispatch(deleteFavoriteProperty());

    const { favoriteProperties } = store.getState();
    expect(favoriteProperties.isLoading).toBe(true);
    expect(favoriteProperties.isError).toBe(false);
  });

  it("should handle deleteFavoriteProperty.fulfilled", () => {
    store.dispatch(deleteFavoriteProperty.fulfilled());

    const { favoriteProperties } = store.getState();
    expect(favoriteProperties.isError).toBe(false);
    expect(favoriteProperties.isSuccess).toBe(true);
  });

  it("should handle deleteFavoriteProperty.rejected", () => {
    const mockError = { message: "An error occurred" };
    store.dispatch(deleteFavoriteProperty.rejected(mockError));

    const { favoriteProperties } = store.getState();
    expect(favoriteProperties.isLoading).toBe(false);
    expect(favoriteProperties.isError).toBe(true);
    expect(favoriteProperties.isSuccess).toBe(false);
  });

  it("should handle updateFavouritePagePropeties", () => {
    const initialState = {
      data: [
        { id: 1, name: "Property 1" },
        { id: 2, name: "Property 2" },
        { id: 3, name: "Property 3" },
      ],
    };

    const action = updateFavouritePagePropeties({ id: 1 });
    const state = favoritePropertiesReducer(initialState, action);
    expect(state.data.length).toBe(2);
  });
});
