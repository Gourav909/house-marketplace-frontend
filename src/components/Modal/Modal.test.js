import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import Modal from "./Modal";

describe("Modal Component", () => {
  const onClose = jest.fn();
  let childComponent;

  beforeEach(() => {
    childComponent = <div data-testid="child-component">Test Child</div>;
  });

  it("renders correctly when open is true", () => {
    render(
      <Modal open={true} onClose={onClose} childComponent={childComponent} />
    );

    const modal = screen.getByTestId("modal");
    const closeIcon = screen.getByTestId("closeIcon");
    const child = screen.getByTestId("child-component");

    expect(modal).toBeInTheDocument();
    expect(closeIcon).toBeInTheDocument();
    expect(child).toBeInTheDocument();

    fireEvent.click(closeIcon);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does not render when open is false", () => {
    render(
      <Modal open={false} onClose={onClose} childComponent={childComponent} />
    );

    const modal = screen.queryByTestId("modal");
    const closeIcon = screen.queryByTestId("closeIcon");
    const child = screen.queryByTestId("child-component");

    expect(modal).toBeNull();
    expect(closeIcon).toBeNull();
    expect(child).toBeNull();
  });
});
