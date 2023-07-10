import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { IPromptEntry, ETagTypes, ETagIDs } from "./types"

export const aiassistApi = createApi({
  reducerPath: "aiassistApi",
  tagTypes: [ETagTypes.entries],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3100/api" }),
  endpoints: (builder) => ({
    getEntries: builder.query<IPromptEntry[], { limit?: number }>({
      query: ({ limit = 10 }) => `entries?limit=${limit}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ uuid }) => ({
                type: ETagTypes.entries as const,
                uuid,
              })),
              { type: ETagTypes.entries, id: ETagIDs.entriesList },
            ]
          : [{ type: ETagTypes.entries, id: ETagIDs.entriesList }],
    }),
    addEntry: builder.mutation<void, IPromptEntry>({
      query: (entry: IPromptEntry) => ({
        url: "entry",
        method: "POST",
        body: entry,
      }),
      invalidatesTags: [{ type: ETagTypes.entries, id: ETagIDs.entriesList }],
    }),
  }),
})

export const { useGetEntriesQuery, useAddEntryMutation } = aiassistApi
