import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import SelectInput from "./SelectInput";

const options = [
  { id: "option1", name: "Option 1" },
  { id: "option2", name: "Option 2" },
  { id: "option3", name: "Option 3" },
];

describe("SelectInput Component", () => {
  const defaultProps = {
    label: "Select an option",
    name: "selectOption",
    value: "option1",
    options: options,
    onChange: jest.fn(),
  };

  it("renders with single selection", () => {
    render(<SelectInput {...defaultProps} multiple={false} />);

    const label = screen.getByTestId("input-label");
    const selectedOption = screen.getByText("Option 1");

    expect(label).toHaveTextContent("Select an option");
    expect(selectedOption).toBeInTheDocument();
  });

  it("renders with multiple selection", () => {
    render(
      <SelectInput
        {...defaultProps}
        multiple={true}
        value={["option1", "option2"]}
      />
    );

    const label = screen.getByTestId("input-label");
    const selectedOption1 = screen.getByText("Option 1");
    const selectedOption2 = screen.getByText("Option 2");

    expect(label).toHaveTextContent("Select an option");
    expect(selectedOption1).toBeInTheDocument();
    expect(selectedOption2).toBeInTheDocument();
  });
});
