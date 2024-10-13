import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
});
export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Product", "User", "Order"],
  endpoints: (builder) => ({}),
});
/*

This code defines an empty object of API endpoints using the @reduxjs/toolkit/query/react library. The endpoints property is a function that returns an object, but in this case, it's an empty object ({}), indicating that no endpoints have been defined for the apiSlice.

This is likely a placeholder or a starting point for defining API endpoints, as seen in other slices like ordersApiSlice and productsApiSlice.

*/
