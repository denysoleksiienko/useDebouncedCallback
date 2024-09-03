import { useCallback, useEffect, useRef } from 'react';

type DebouncedCallback<T extends (...args: any[]) => void> = (
  ...args: Parameters<T>
) => void;

export const useDebouncedCallback = <T extends (...args: any[]) => void>(
  next: T,
  debounce = 300,
  dependencies: any[] = [],
): DebouncedCallback<T> => {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const callback = useCallback(
    (...args: Parameters<T>) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => next(...args), debounce);
    },
    [next, debounce, ...dependencies],
  );

  useEffect(() => {
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, []);

  return callback;
};
