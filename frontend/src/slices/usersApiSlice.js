import { USERS_URL } from "../constants";

import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: USERS_URL,
      }),
      keepUnusedDataFor: 0.5,
    }),

    getUserDetails: builder.query({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
      }),
      keepUnusedDataFor: 0.5,
    }),

    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),

    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserDetailsQuery,
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
} = usersApiSlice;
