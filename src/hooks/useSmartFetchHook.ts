import { 
  useState, 
  useMemo, 
  useTransition, 
  useCallback, 
  useRef, 
  useEffect,
} from 'react';
import type { SetStateAction } from 'react';

/**
 * Standard shape for Meta data in Paginated API Responses
 */
export type TMeta = {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
};

/**
 * Standard shape for Paginated API Responses
 */
export type ApiListResponse<T> = {
  success: boolean;
  message: string;
  statusCode: number;
  data: T[];
  meta: TMeta;
};

/**
 * Common query parameters for list-based APIs
 */
type BaseParams = {
  page?: number;
  limit?: number;
  searchTerm?: string;
  [key: string]: unknown;
};

/**
 * The interface for the hook's return values
 */
export type UseSmartFetchReturn<P extends BaseParams, T> = {
  data: T[];
  meta: TMeta | undefined;
  isLoading: boolean;
  isInitialLoading: boolean;
  isRefetching: boolean;
  isPending: boolean;
  isFetching: boolean;
  isError: boolean;
  filter: Partial<P>;
  setFilter: (
    update: SetStateAction<Partial<P>>,
    config?: { resetPage?: boolean; debounce?: boolean }
  ) => void;
  setPage: (page: number) => void;
  resetFilters: () => void;
  refetch: () => void;
};

/**
 * Type definition for the query function (usually from RTK Query or custom fetch)
 */
type QueryHook<P extends BaseParams, T> = (
  params: P
) => {
  data?: ApiListResponse<T>;
  isLoading: boolean;
  isError: boolean;
  isFetching: boolean;
  refetch?: () => void;
};

/**
 * useSmartFetchHook - Optimized for React 19
 * A highly flexible hook for managing paginated data with smart debouncing, 
 * automatic page resets, and non-blocking state transitions.
 */
const useSmartFetchHook = <P extends BaseParams, T>(
  queryHook: QueryHook<P, T>,
  options: Partial<P> = {} as Partial<P>,
  initialParams: Partial<P> = {} as Partial<P>
): UseSmartFetchReturn<P, T> => {

  // Memoize default values to maintain reference stability
  const defaultValues = useMemo(() => ({
    page: 1,
    limit: options.limit ?? 10,
    ...initialParams,
    ...options
  }), [initialParams, options]);

  // 'filter' state handles instant UI updates (e.g., input field values)
  const [filter, setFilterState] = useState<Partial<P>>(defaultValues);
  
  // 'queryParams' state triggers the actual API request
  const [queryParams, setQueryParams] = useState<Partial<P>>(defaultValues);
  
  // React 19 Transition for non-blocking UI during large re-renders
  const [isPending, startTransition] = useTransition();
  
  // Ref to track the debounce timer for cleanup
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Cleanup timer on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  // Execute the provided query hook with current query parameters
  const {
    data,
    isLoading,
    isError,
    isFetching,
    refetch: originalRefetch
  } = queryHook(queryParams as P);

  /**
   * Updates filters with optional debouncing and smart pagination reset.
   * @param update - The new partial filter state or a functional updater.
   * @param config - Options to control debounce and page reset behavior.
   */
  const setFilter = useCallback((
    update: SetStateAction<Partial<P>>, 
    config?: { resetPage?: boolean; debounce?: boolean }
  ) => {
    const isDebounceRequired = config?.debounce ?? false;

    // First, resolve what the new state should be
    const resolveNewState = (prev: Partial<P>) => {
      const next = typeof update === 'function' 
        ? (update as (prev: Partial<P>) => Partial<P>)(prev) 
        : update;
      
      const shouldResetPage = config?.resetPage ?? !('page' in next);
      
      return {
        ...prev,
        ...next,
        page: shouldResetPage ? 1 : (next.page ?? prev.page ?? 1)
      };
    };

    // Update the UI state immediately
    setFilterState(prev => {
      const newState = resolveNewState(prev);
      
      if (isDebounceRequired) {
        if (debounceTimerRef.current) {
          clearTimeout(debounceTimerRef.current);
        }
        
        debounceTimerRef.current = setTimeout(() => {
          startTransition(() => {
            setQueryParams(newState);
          });
        }, 500);
      } else {
        startTransition(() => {
          setQueryParams(newState);
        });
      }
      
      return newState;
    });
  }, []);

  /**
   * Specifically updates the current page (always instant)
   */
  const setPage = useCallback((page: number) => {
    setFilter({ page } as Partial<P>, { resetPage: false, debounce: false });
  }, [setFilter]);

  /**
   * Resets all filters and pagination to original initial state
   */
  const resetFilters = useCallback(() => {
    startTransition(() => {
      setFilterState(defaultValues);
      setQueryParams(defaultValues);
    });
  }, [defaultValues]);

  /**
   * Manually triggers a data refetch
   */
  const refetch = useCallback(() => {
    if (originalRefetch) {
      originalRefetch();
    } else {
      // Fallback: Trigger a state-based refetch if original refetch isn't available
      setQueryParams(prev => ({ ...prev }));
    }
  }, [originalRefetch]);

  // Memoize the data list to prevent unnecessary downstream re-renders
  const list = useMemo(() => data?.data ?? [], [data?.data]);
  const meta = data?.meta;

  return {
    data: list,
    meta,
    isLoading,
    isInitialLoading: isLoading && !data,
    isRefetching: isFetching && !!data,
    isPending,
    isError,
    isFetching,
    setPage,
    filter,
    setFilter,
    resetFilters,
    refetch
  };
};

export default useSmartFetchHook;