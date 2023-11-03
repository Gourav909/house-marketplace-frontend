import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DeleteConfirmationDialog from "./DeleteConfirmationDialog";

describe("DeleteConfirmationDialog Component", () => {
  const defaultProps = {
    open: true,
    onClose: jest.fn(),
    onConfirm: jest.fn(),
    title: "Delete Confirmation",
    content: "Are you sure you want to delete this item?",
  };
  function getElements() {
    return {
      dialogTitle: screen.queryByText(defaultProps.title),
      dialogContent: screen.queryByText(defaultProps.content),
      cancelButton: screen.queryByText("Cancel"),
      confirmButton: screen.queryByText("Confirm"),
    };
  }

  it("should render the dialog with title and content", () => {
    render(<DeleteConfirmationDialog {...defaultProps} />);
    const { dialogTitle, dialogContent, cancelButton, confirmButton } =
      getElements();
    expect(dialogTitle).toBeInTheDocument();
    expect(dialogContent).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
    expect(confirmButton).toBeInTheDocument();
  });

  it("should call onClose when Cancel button is clicked", () => {
    render(<DeleteConfirmationDialog {...defaultProps} />);
    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it("should call onConfirm when Confirm button is clicked", () => {
    render(<DeleteConfirmationDialog {...defaultProps} />);
    const confirmButton = screen.getByText("Confirm");
    fireEvent.click(confirmButton);
    expect(defaultProps.onConfirm).toHaveBeenCalled();
  });

  it("should not render when open is false", () => {
    render(<DeleteConfirmationDialog {...defaultProps} open={false} />);
    const { dialogTitle, dialogContent, cancelButton, confirmButton } =
      getElements();
    expect(dialogTitle).toBeNull();
    expect(dialogContent).toBeNull();
    expect(cancelButton).toBeNull();
    expect(confirmButton).toBeNull();
  });
});
