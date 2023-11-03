import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import FavouritePropertiesPage from "../favouriteProperties";
import { MOCKPROPERTY } from "src/test/jest/_mocks_/mockProperties";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe("FavouritePropertiesPage", () => {
  it("should fetch and display favorite properties", async () => {
    useSelector.mockImplementation((selector) =>
      selector({
        favoriteProperties: {
          data: MOCKPROPERTY,
          paginationData: { page: 1, total: 2 },
          isLoading: false,
        },
      })
    );
    useDispatch.mockReturnValue(jest.fn());

    render(
      <BrowserRouter>
        <FavouritePropertiesPage />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Test property 2")).toBeInTheDocument();
    });
  });

  it("should display a message when no favorite properties are available", async () => {
    useSelector.mockImplementation((selector) =>
      selector({
        favoriteProperties: {
          data: [],
          paginationData: { page: 1, total: 0 },
          isLoading: false,
        },
      })
    );
    useDispatch.mockReturnValue(jest.fn());

    render(
      <BrowserRouter>
        <FavouritePropertiesPage />
      </BrowserRouter>
    );
    expect(screen.getByText("No records found")).toBeInTheDocument();
  });
});
