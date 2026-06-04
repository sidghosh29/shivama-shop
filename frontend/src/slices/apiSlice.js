import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL } from "../constants";

import { logout } from "./authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: "include",
});

const baseQueryWithAuthCheck = async (args, api, extraOptions) => {
  console.log("Base query called with args:", args);
  const result = await baseQuery(args, api, extraOptions);
  const url = typeof args === "string" ? args : args.url;
  const isAuthEndpoint = url === "/users/login";

  if (result.error && result.error.status === 401 && !isAuthEndpoint) {
    api.dispatch(logout());
    window.location.href = "/login";
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithAuthCheck,
  tagTypes: ["Product", "User", "Order"],
  endpoints: (builder) => ({}),
});
