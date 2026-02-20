import { FetchBaseQueryError } from '@reduxjs/toolkit/query'; 

interface ApiErrorResponse {
  message: string;
}

export function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === 'object' && error !== null && 'status' in error;
}

export function isErrorMessage(
  error: unknown,
): error is FetchBaseQueryError & { data: ApiErrorResponse } {
  return (
    isFetchBaseQueryError(error) &&
    typeof error.data === 'object' &&
    error.data !== null &&
    'message' in error.data
  );
} 