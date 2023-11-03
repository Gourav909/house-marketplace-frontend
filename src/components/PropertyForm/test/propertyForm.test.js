import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { BrowserRouter } from "react-router-dom";
import thunk from "redux-thunk";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import PropertyForm from "../PropertyForm";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const theme = createTheme();

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));

describe("PropertyForm Component", () => {
  const initialState = {
    cities: {
      citiesData: { cities: [], isSuccess: false, isFetching: false },
    },
    property: {
      data: { id: 1, title: "type 1" },
      isSuccess: true,
      isFetching: false,
      errors: [],
    },
  };

  const renderPropertyForm = (initialState, isEdit = false) => {
    const store = mockStore(initialState);
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <PropertyForm isEdit={isEdit} />
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    );
  };

  beforeEach(() => {
    renderPropertyForm(initialState, false);
  });

  it("renders the component for adding a new property header and other filed", () => {
    const addHeaderText = screen.getByText("Add Property");
    expect(addHeaderText).toBeInTheDocument();
  });

  it("handles form input changes", async () => {
    const titleInput = screen.getByLabelText("Title");
    expect(titleInput).toBeInTheDocument();
    fireEvent.change(titleInput, { target: { value: "New Title" } });
    await waitFor(() => {
      expect(titleInput.value).toBe("New Title");
    });
  });

  it("submits the form for adding a new property", async () => {
    const submitButton = screen.getByRole("button", {
      name: "Create Property",
    });

    fireEvent.click(submitButton);
    const title = screen.getByLabelText("Title");
    const pricePerMonth = screen.getByLabelText("Price Per Month");
    const netSize = screen.getByLabelText("Net Size");
    const numberofRooms = screen.getByLabelText("Number of Rooms");
    const mrt = screen.getByLabelText("MRT");
    const description = screen.getByLabelText("Description");
    const fileInput = screen.getByTestId("imageUrl");
    const propertyInput = screen
      .getByTestId("propertyType")
      .querySelector("input");
    const cityInput = screen.getByTestId("city").querySelector("input");
    const districtInput = screen.getByTestId("district").querySelector("input");
    const imageFile = new File(["sample-image"], "sample.jpg", {
      type: "image/jpeg",
    });
    const submit = screen.getByRole("button", { name: "Create Property" });
    fireEvent.change(fileInput, { target: { files: [imageFile] } });
    fireEvent.change(title, { target: { value: "New Title1" } });
    fireEvent.change(pricePerMonth, { target: { value: "34" } });
    fireEvent.change(netSize, { target: { value: "230" } });
    fireEvent.change(numberofRooms, { target: { value: "2" } });
    fireEvent.change(mrt, { target: { value: "example" } });
    fireEvent.change(description, { target: { value: "example" } });
    fireEvent.change(propertyInput, { target: { value: "Residential" } });
    fireEvent.change(cityInput, { target: { value: "Taipei city" } });
    fireEvent.change(districtInput, { target: { value: "Zhongzheng" } });
    fireEvent.click(submit);
    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalled();
    });
  });
});
