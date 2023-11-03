import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import Property from "./Property";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { BrowserRouter } from "react-router-dom";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore({
  currentPage: 1,
  arr: [],
});

const renderProperty = (isAdmin, handleFavIconChanges) => {
  return render(
    <Provider store={store}>
      <BrowserRouter>
        <Property
          propertyDetail={propertyDetail}
          isAdmin={isAdmin}
          handleFavIconChanges={handleFavIconChanges}
        />
      </BrowserRouter>
    </Provider>
  );
};

const propertyDetail = {
  id: "1",
  title: "Sample Property",
  price_per_month: 1000,
  address: {
    city_name: "City 1",
    district_name: "District 1",
  },
  is_favourite: false,
};

describe("Property Component", () => {
  it("renders property details correctly", () => {
    renderProperty(false);

    expect(screen.getByText(/Sample Property/i)).toBeInTheDocument();
    expect(screen.getByText(/NT\$/i)).toBeInTheDocument();
    expect(screen.getByText(/1000/i)).toBeInTheDocument();
    expect(screen.getByText(/City 1 District 1/i)).toBeInTheDocument();
  });

  it("renders admin actions when hovered", () => {
    renderProperty(true);
    fireEvent.mouseEnter(screen.getByTestId("property-card"));
    expect(screen.getByTestId("edit-button")).toBeInTheDocument();
    expect(screen.getByTestId("delete-button")).toBeInTheDocument();
  });

  it("handles favorite icon click for a user", async () => {
    const handleFavIconChanges = jest.fn();
    renderProperty(false, handleFavIconChanges);
    fireEvent.mouseEnter(screen.getByTestId("property-card"));
    const favoriteIcon = screen.getByTestId("iconButton");
    fireEvent.click(favoriteIcon);
    await waitFor(() => {
      expect(screen.getByTestId("favicon")).toHaveStyle("fill: white");
    });
  });

  it("renders user actions when hovered show favicon", () => {
    const handleFavIconChanges = jest.fn();
    renderProperty(false, handleFavIconChanges);

    fireEvent.mouseEnter(screen.getByTestId("property-card"));
    expect(screen.getByTestId("iconButton")).toBeInTheDocument();
  });

  it("shows delete confirmation dialog when delete button is clicked", () => {
    renderProperty(true);

    fireEvent.mouseEnter(screen.getByTestId("property-card"));
    fireEvent.click(screen.getByTestId("delete-button"));

    expect(
      screen.queryByTestId("delete-confirmation-dialog")
    ).toBeInTheDocument();
  });

  it("navigates to the property details page when clicked by a user", () => {
    const { container } = renderProperty(false);

    const card = screen.getByTestId("box-card");
    fireEvent.click(card);
    expect(container).toBeDefined();
    expect(window.location.pathname).toBe("/user/property-details/1");
  });
});
