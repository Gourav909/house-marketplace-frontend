import React from "react";
import { render, screen } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import PropertyDetailPage from "../PropertyDetailPage";
import { fetchPropertyDetail } from "../property.slice";
import { MOCKPROPERTY } from "src/test/jest/_mocks_/mockProperties";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  useParams: jest.fn(),
}));

jest.mock("../property.slice", () => ({
  fetchPropertyDetail: jest.fn(),
}));

describe("PropertyDetailPage", () => {
  beforeEach(() => {
    useSelector.mockImplementation((selector) =>
      selector({
        propertyDetail: {
          data: {
            properties: MOCKPROPERTY[0],
          },
          isLoading: false,
        },
      })
    );
  });

  afterEach(() => {
    useSelector.mockClear();
    useDispatch.mockClear();
    useParams.mockClear();
    fetchPropertyDetail.mockClear();
  });

  it("should render property details when not loading", async () => {
    useParams.mockReturnValue({ id: "61" });
    useDispatch.mockReturnValue(jest.fn());
    render(<PropertyDetailPage />);
    expect(screen.getByText("Test property 2")).toBeInTheDocument();
  });

  it("should fetch property detail when mounted", async () => {
    useParams.mockReturnValue({ id: "61" });
    const dispatchMock = jest.fn();
    useDispatch.mockReturnValue(dispatchMock);

    render(<PropertyDetailPage />);

    expect(fetchPropertyDetail).toHaveBeenCalledTimes(1);
    expect(fetchPropertyDetail).toHaveBeenCalledWith("61");
    expect(dispatchMock).toHaveBeenCalledWith(fetchPropertyDetail("61"));
  });
  it("should show loading spinner while loading", async () => {
    useParams.mockReturnValue({ id: "61" });
    useDispatch.mockReturnValue(jest.fn());

    useSelector.mockImplementation((selector) =>
      selector({
        propertyDetail: {
          data: {},
          isLoading: true,
        },
      })
    );
    render(<PropertyDetailPage />);
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });
});
