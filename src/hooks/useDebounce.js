import { useEffect, useState } from "react";

const useDebounce = (value) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return [debouncedValue, setDebouncedValue];
};

export default useDebounce;
