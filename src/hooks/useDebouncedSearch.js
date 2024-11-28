import { useEffect, useState } from "react";

export function useDebouncedSearch(search, delay = 400) {
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search);
    }, delay);

    return () => clearTimeout(timeout);
  }, [search, delay]);

  return debouncedSearch;
}
