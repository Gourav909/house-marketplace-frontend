import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";

import DashboardHeader from "../DashboardHeader";

const mockNavigate = jest.fn();
const mockDispatch = jest.fn();

jest.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));

describe("DashboardHeader Component", () => {
  it("renders without crashing", () => {
    render(<DashboardHeader />);
  });

  it("displays the search input field", () => {
    render(<DashboardHeader />);
    const searchInput = screen.getByTestId("searchBar");

    expect(searchInput).toBeInTheDocument();
  });

  it("handles changes in the search input", () => {
    render(<DashboardHeader />);
    const searchId = screen.getByTestId("searchBar");
    const searchInput = searchId.querySelector("input");
    fireEvent.change(searchInput, { target: { value: "test input" } });

    expect(searchInput.value).toBe("test input");
  });

  it("renders filter modal when clicked on filter icon", () => {
    render(<DashboardHeader />);
    const filterButton = screen.getByRole("button", { name: /Filter/i });
    fireEvent.click(filterButton);

    expect(screen.getByTestId("modal")).toBeInTheDocument();
  });

  it("renders 'Add' button when 'isAdmin' is true", () => {
    render(<DashboardHeader isAdmin={true} />);
    const addButton = screen.getByRole("button", { name: /Add/i });
    expect(addButton).toBeInTheDocument();
  });
});
