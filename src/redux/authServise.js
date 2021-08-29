import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://connections-api.herokuapp.com/',
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['auth', 'current'],
  keepUnusedDataFor: 0,
  endpoints: builder => ({
    signup: builder.mutation({
      query: body => ({
        url: 'users/signup',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['auth'],
    }),
    login: builder.mutation({
      query: body => ({
        url: 'users/login',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['auth'],
    }),
    logout: builder.mutation({
      query: () => ({
        url: 'users/logout',
        method: 'POST',
      }),
      invalidatesTags: ['auth'],
    }),
    current: builder.query({
      query: () => 'users/current',
      invalidatesTags: ['current'],
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useLogoutMutation,
  useCurrentQuery,
} = authApi;
