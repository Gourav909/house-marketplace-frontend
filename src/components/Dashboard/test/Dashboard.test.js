import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { BrowserRouter } from "react-router-dom";

import useUserType from "src/hooks/useUserType";
import Dashboard from "../Dashboard";
import {
  MOCKPROPERTY,
  MOCKPAGINATIONDATA,
} from "src/test/jest/_mocks_/mockProperties";

jest.mock("src/hooks/useUserType");
const middlewares = [thunk];

const mockStore = configureStore(middlewares);
const initialState = {
  properties: {
    properties: [],
    paginationData: [],
    fetching: false,
    isSuccess: true,
    isError: false,
    error: [],
  },
};

const mockData = {
  isAdmin: true,
  currentPage: 1,
  setCurrentPage: jest.fn(),
  properties: MOCKPROPERTY,
  paginationData: MOCKPAGINATIONDATA,
  fetching: false,
  isFav: false,
};

const mockDispatch = jest.fn();

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));

describe("Dashboard Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
    useUserType.mockReturnValue(false);
  });

  const renderDashboard = (props) =>
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Dashboard {...props} />
        </BrowserRouter>
      </Provider>
    );

  it("renders the Admin Dashboard component with properties", () => {
    renderDashboard(mockData);

    const property1 = screen.getByText("Test property 2");
    const property2 = screen.getByText("Test property 3");
    const AddBtn = screen.getByText("Add");

    expect(property1).toBeInTheDocument();
    expect(property2).toBeInTheDocument();
    expect(AddBtn).toBeInTheDocument();
  });

  it("renders the user Dashboard component with properties", () => {
    renderDashboard({ ...mockData, isAdmin: false });
    const property1 = screen.getByText("Test property 2");
    const property2 = screen.getByText("Test property 3");
    const AddBtn = screen.queryByText("Add");

    expect(property1).toBeInTheDocument();
    expect(property2).toBeInTheDocument();
    expect(AddBtn).toBeNull();
  });

  it("calls handlePageChange when the page is changed", () => {
    renderDashboard(mockData);
    const pagination = screen.getByText("2");
    pagination.click();

    expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function));
    expect(screen.queryByText("2")).toBeInTheDocument();
  });

  it("renders loading spinner while fetching data", () => {
    renderDashboard({ ...mockData, fetching: true });
    const loadingSpinner = screen.getByRole("progressbar");

    expect(loadingSpinner).toBeInTheDocument();
  });

  it("renders 'No records found' when there are no properties", () => {
    renderDashboard({ ...mockData, properties: [] });
    const noRecordsMessage = screen.getByText("No records found");

    expect(noRecordsMessage).toBeInTheDocument();
  });
});
