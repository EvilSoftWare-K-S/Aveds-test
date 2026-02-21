import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getToken } from '@shared/utils/storageTokens';

export const logoutApi = createApi({
  reducerPath: 'logoutApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/auth',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      const tokens = getToken();
      if (tokens?.accessToken) {
        headers.set('Authorization', `Bearer ${tokens.accessToken}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
    }),
  }),
});

export const { useLogoutMutation } = logoutApi;