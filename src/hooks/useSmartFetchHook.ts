/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useMemo, useTransition, useCallback, useEffect } from 'react';
import type { TMeta } from '@/types/global.types';

// Generic API list response shape
export type ApiListResponse<T> = {
  success: boolean;
  message: string;
  statusCode: number;
  data: T[];
  meta: TMeta;
};

/**
 * Internal debounce hook
 */
function useInternalDebounce<T>(value: T, delay = 400): T {
  const [debounced, setDebounced] = useState<T>(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

type BaseParams = { page?: number; limit?: number; };

// The hook returned values
export type UseSmartFetchReturn<P extends BaseParams, T> = {
  data: T[];
  meta: TMeta | undefined;
  isLoading: boolean;
  isPending: boolean;
  isFetching: boolean;
  isError: boolean;
  filter: Partial<P>;
  setFilter: React.Dispatch<React.SetStateAction<Partial<P>>>;
  setPage: (page: number) => void;
  resetFilters: () => void;
};

type QueryHook<P extends BaseParams, T> = (
  params: P
) => { data?: ApiListResponse<T>; isLoading: boolean; isError: boolean; isFetching: boolean };

/**
 * useSmartFetchHook - Optimized for React 19
 * Handles pagination, debounced search, and generic filters.
 */
const useSmartFetchHook = <P extends BaseParams, T>(
  queryHook: QueryHook<P, T>,
  options: Partial<P> = {} as Partial<P>,
  initialParams: Partial<P> = {} as Partial<P>
): UseSmartFetchReturn<P, T> => {
  // Merged state for simpler management
  const [filter, setRawFilter] = useState<Partial<P>>({
    page: 1,
    limit: options.limit || 10,
    ...initialParams,
    ...options
  });
  
  // React 19 transition for non-blocking state updates
  const [isPending, startTransition] = useTransition();

  // Debounce filter params to prevent excessive API calls
  const debouncedFilter = useInternalDebounce<Partial<P>>(filter);

  // Execute the query hook
  const { data, isLoading, isError, isFetching } = queryHook(debouncedFilter as P);

  // Smart setFilter that resets page to 1 unless page is explicitly updated
  const setFilter = useCallback((update: React.SetStateAction<Partial<P>>) => {
    setRawFilter(prev => {
      const next = typeof update === 'function' ? (update as any)(prev) : update;
      // If the update doesn't contain a new page, reset it to 1
      return { ...next, page: next.page || 1 };
    });
  }, []);

  // Helper to set current page safely
  const setPage = useCallback((page: number) => {
    setRawFilter(prev => ({ ...prev, page }));
  }, []);

  // Reset all filters
  const resetFilters = useCallback(() => {
    startTransition(() => {
      setRawFilter({
        page: 1,
        limit: options.limit || 10,
        ...initialParams,
        ...options
      });
    });
  }, [initialParams, options]);

  const list = useMemo(() => data?.data ?? [], [data?.data]);
  const meta = data?.meta;

  return {
    data: list,
    meta,
    isLoading,
    isPending,
    isError,
    isFetching,
    setPage,
    filter,
    setFilter,
    resetFilters,
  };
};

export default useSmartFetchHook;
