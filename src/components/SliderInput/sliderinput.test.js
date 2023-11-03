import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SliderInput from "./SliderInput";

describe("SliderInput Component", () => {
  const label = "Test Slider";
  const name = "testSlider";
  const min = 0;
  const max = 100;
  const value = [25, 75];
  const onChange = jest.fn();

  beforeEach(() => {
    render(
      <SliderInput
        label={label}
        name={name}
        value={value}
        min={min}
        max={max}
        onChange={onChange}
      />
    );
  });

  it("displays the label correctly", () => {
    const labelElement = screen.getByText(label);
    expect(labelElement).toBeInTheDocument();
  });

  it("calls the onChange callback when the slider value changes", () => {
    const sliderInputId = screen.getByTestId("slider-input");
    const sliderInput = sliderInputId.querySelector("input");
    fireEvent.change(sliderInput, { target: { value: [30, 70] } });
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
