import { useEffect, useState } from "react";

const useDebounce = (value, time) => {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebounceValue(value), time);

    return () => {
      clearTimeout(handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return debounceValue;
};

export default useDebounce;
