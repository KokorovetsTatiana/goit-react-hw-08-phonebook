import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const contactApi = createApi({
  reducerPath: 'contactApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://connections-api.herokuapp.com/',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['contact'],
  keepUnusedDataFor: 30,
  endpoints: builder => ({
    getContact: builder.query({
      query: () => 'contacts',
      providesTags: ['contact'],
    }),
    deleteContact: builder.mutation({
      query(id) {
        return {
          url: `contacts/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['contact'],
    }),
    addContact: builder.mutation({
      query(body) {
        return {
          url: 'contacts',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['contact'],
    }),
    pacthContact: builder.mutation({
      query({ event, id }) {
        return {
          url: `contacts/${id}`,
          method: 'PATCH',
          body: event,
        };
      },
      invalidatesTags: ['contact'],
    }),
  }),
});

export const {
  useGetContactQuery,
  useDeleteContactMutation,
  useAddContactMutation,
  usePacthContactMutation,
} = contactApi;
