import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Profile } from "./profileTypes";

export const profileApiSlice = createApi({
  reducerPath: "profile",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://household-backend.azurewebsites.net/api/V01/profile ",
  }),
  tagTypes: ["profiles"],
  endpoints: (builder) => ({
    getProfilesFromUserId: builder.query<Profile[], string>({
      query: (userId: string) => "/getProfileByUserId/" + userId,
      providesTags: ["profiles"],
    }),
  }),
});

export const { useGetProfilesFromUserIdQuery } = profileApiSlice;
