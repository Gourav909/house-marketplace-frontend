import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import Filters from "./Filters";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);
const mockDispatch = jest.fn();

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => mockDispatch,
}));

const onCloseMock = jest.fn();
const store = mockStore({});

const mockFetchedCitiesData = {
  data: {
    cities: [
      {
        id: "city1",
        name: "City 1",
        districts: ["District 1", "District 2"],
      },
      {
        id: "city2",
        name: "City 2",
        districts: ["District 3", "District 4"],
      },
    ],
  },
};

jest.mock(
  "src/hooks/useFetchCitiesAndDistricts",
  () => () => mockFetchedCitiesData
);

describe("Filters Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    render(
      <Provider store={store}>
        <Filters onClose={onCloseMock} currentPage={1} debouncedSearch="" />
      </Provider>
    );
  });

  it("renders without errors", () => {
    expect(screen.getByTestId("propertyType")).toBeInTheDocument();
    expect(screen.getByTestId("city")).toBeInTheDocument();
    expect(screen.getByTestId("district")).toBeInTheDocument();
    expect(screen.getByTestId("netSize")).toBeInTheDocument();
    expect(screen.getByTestId("rentPerMonth")).toBeInTheDocument();
  });

  it("handles filter changes", () => {
    const citySelect = screen.getByTestId("city");
    const cityInput = citySelect.querySelector("input");
    const propertyTypeSelect = screen.getByTestId("propertyType");
    const propertyTypeInput = propertyTypeSelect.querySelector("input");

    fireEvent.change(propertyTypeInput, {
      target: { name: "property_type", value: "residential" },
    });
    fireEvent.change(cityInput, { target: { name: "city", value: 1 } });

    expect(cityInput.name).toBe("city");
    expect(propertyTypeInput.value).toBe("residential");
  });

  it("adjusts the Net Size slider", () => {
    const netSizeSlider = screen.getByTestId("netSize");
    const netSizeInput = netSizeSlider.querySelector("input");

    fireEvent.change(netSizeInput, {
      target: { name: "net_size", value: 2500 },
    });

    expect(netSizeInput.value).toBe("2500");
  });

  it("adjusts the Rent Per Month slider", () => {
    const rentPerMonthSlider = screen.getByTestId("rentPerMonth");
    const rentPerMonthInput = rentPerMonthSlider.querySelector("input");
    fireEvent.change(rentPerMonthInput, {
      target: { name: "price_per_month", value: 1000 },
    });
    expect(rentPerMonthInput.value).toBe("1000");
  });

  it("cancels the filter form", () => {
    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);
    expect(onCloseMock).toHaveBeenCalled();
  });

  it("submits the filters", () => {
    const applyFiltersButton = screen.getByText("Apply Filters");
    const citySelect = screen.getByTestId("city");
    const cityInput = citySelect.querySelector("input");

    fireEvent.change(cityInput, { target: { name: "city", value: 1 } });

    fireEvent.click(applyFiltersButton);
    expect(mockDispatch).toHaveBeenCalled();
  });
});
