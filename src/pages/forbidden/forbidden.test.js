import React from "react";
import { render, screen } from "@testing-library/react";
import Forbidden from "./Forbidden";

describe("Forbidden Component", () => {
  beforeEach(() => {
    render(<Forbidden />);
  });
  it("renders without errors", () => {
    const forbiddenText = screen.getByText("Forbidden");
    expect(forbiddenText).toBeInTheDocument();
  });

  it("displays the text in the center of the screen", () => {
    const forbiddenText = screen.getByText("Forbidden");
    const computedStyle = getComputedStyle(forbiddenText);

    expect(computedStyle.display).toBe("flex");
    expect(computedStyle.justifyContent).toBe("center");
    expect(computedStyle.alignItems).toBe("center");
  });

  it("applies the specified font size and font weight", () => {
    const forbiddenText = screen.getByText("Forbidden");
    const computedStyle = getComputedStyle(forbiddenText);

    expect(computedStyle.fontSize).toBe("40px");
    expect(computedStyle.fontWeight).toBe("500");
  });
});
