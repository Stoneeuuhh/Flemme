import { useEffect, useState } from 'react';

const PREFIX = 'mealplanner:';

export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(PREFIX + key);
      return raw ? (JSON.parse(raw) as T) : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(PREFIX + key, JSON.stringify(value));
    } catch {
      /* stockage plein ou indisponible : on ignore */
    }
  }, [key, value]);

  return [value, setValue] as const;
}
