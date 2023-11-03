import React from "react";
import { render, act } from "@testing-library/react";

import useDebounce from "../useDebounce";

describe("useDebounce", () => {
  jest.useFakeTimers();

  it("should debounce the input value", () => {
    let debouncedValue;
    const TestComponent = ({ value }) => {
      debouncedValue = useDebounce(value)[0];
      return null;
    };

    const { rerender } = render(<TestComponent value="initial" />);

    expect(debouncedValue).toBe("initial");

    // Update the value and re-render
    rerender(<TestComponent value="updated" />);
    expect(debouncedValue).toBe("initial"); // Initial value should be retained

    // Advance the timers by 500ms (timeout duration)
    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(debouncedValue).toBe("updated"); // Debounced value should update after 500ms
  });

  it("should clear the timeout when unmounted", () => {
    const clearTimeoutSpy = jest.spyOn(global, "clearTimeout");
    const TestComponent = ({ value }) => {
      useDebounce(value);
      return null;
    };

    const { unmount } = render(<TestComponent value="initial" />);
    unmount();

    // Ensure that clearTimeout is called
    expect(clearTimeoutSpy).toHaveBeenCalledTimes(1);

    // Restore the original clearTimeout function after the test
    clearTimeoutSpy.mockRestore();
  });
});
