import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ProfileResponse } from '../types/profileType';
import { RootState } from '@app/store';

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/auth',
    prepareHeaders: (headers, { getState }) => {
      headers.set('Content-Type', 'application/json');
      const token = (getState() as RootState).token?.accessToken;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    profileApi: builder.query<ProfileResponse, void>({
      query: () => ({
        url: '/me',
        method: 'GET',
      }),
    }),
  }),
});

export const { useProfileApiQuery } = profileApi;