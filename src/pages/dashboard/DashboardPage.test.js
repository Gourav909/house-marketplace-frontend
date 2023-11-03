import React from "react";
import { render, act, screen } from "@testing-library/react";
import DashboardPage from "./DashboardPage";
import { Provider } from "react-redux";
import { store } from "src/config/store";
import { BrowserRouter } from "react-router-dom";
import * as useUserTypeModule from "src/hooks/useUserType";

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
  useSelector: (selector) =>
    selector({
      properties: {
        properties: [
          { id: 1, title: "Property 1" },
          { id: 2, title: "Property 2" },
        ],
        paginationData: { currentPage: 1 },
        fetching: false,
      },
    }),
}));

describe("DashboardPage Component", () => {
  const renderDashboardPage = () =>
    render(
      <Provider store={store}>
        <BrowserRouter>
          <DashboardPage />
        </BrowserRouter>
      </Provider>
    );
  it("renders the admin Dashboard component with the correct props", async () => {
    jest.spyOn(useUserTypeModule, "default").mockReturnValue(true);
    renderDashboardPage();
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(screen.getByText("Property 1")).toBeInTheDocument();
    expect(screen.getByText("Add")).toBeInTheDocument();
  });

  it("renders the user Dashboard component with the correct props", async () => {
    jest.spyOn(useUserTypeModule, "default").mockReturnValue(false);

    renderDashboardPage();
    expect(screen.getByText("Property 2")).toBeInTheDocument();
    expect(screen.queryByText("Add")).toBeNull();
  });
});
