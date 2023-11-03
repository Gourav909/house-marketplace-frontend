import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import NavBar from "./NavBar";
import { store } from "src/config/store";
import * as useUserTypeModule from "src/hooks/useUserType";

describe("NavBar Component", () => {
  const renderDashboard = () =>
    render(
      <Provider store={store}>
        <BrowserRouter>
          <NavBar />
        </BrowserRouter>
      </Provider>
    );
  it("renders navigation links", () => {
    renderDashboard();
    const dashboardLink = screen.getByText("Dashboard");
    const myFavouritesLink = screen.getByText("My Favourites");
    const logoutLink = screen.getByText("Log out");

    expect(dashboardLink).toBeInTheDocument();
    expect(myFavouritesLink).toBeInTheDocument();
    expect(logoutLink).toBeInTheDocument();
  });

  it('displays "My Favourites" link when not an admin', () => {
    jest.spyOn(useUserTypeModule, "default").mockReturnValue(false);

    renderDashboard();

    const myFavouritesLink = screen.queryByText("My Favourites");

    expect(myFavouritesLink).toBeInTheDocument();
  });

  it('hides "My Favourites" link when an admin', async () => {
    jest.spyOn(useUserTypeModule, "default").mockReturnValue(true);
    renderDashboard();

    await waitFor(() => {
      const myFavouritesLink = screen.queryByText("My Favourites");
      expect(myFavouritesLink).toBeNull();
    });
  });
});
