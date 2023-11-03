import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import SearchBar from "./SearchBar";

const onChangeHandler = jest.fn();

describe("SearchBar Component", () => {
  let inputField;

  beforeEach(() => {
    render(<SearchBar onChangeHandler={onChangeHandler} />);
    inputField = screen.getByTestId("searchBar");
  });

  it("SearchBar calls onChangeHandler when input value changes", () => {
    const searchBox = inputField.querySelector("input");
    fireEvent.change(searchBox, { target: { value: "Test input" } });

    expect(onChangeHandler).toHaveBeenCalledWith(expect.any(Object));
  });

  test("SearchBar displays the search icon", () => {
    const searchIcon = screen.getByTestId("searchIcon");
    expect(searchIcon).toBeInTheDocument();
  });
});
