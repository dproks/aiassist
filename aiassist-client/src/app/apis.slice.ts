import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { IPromptEntry, ETagTypes, ETagIDs, IHelpersCard } from "./types"

const baseUrl = "http://localhost:3100/api"

export const aiassistApi = createApi({
  reducerPath: "aiassistApi",
  tagTypes: [ETagTypes.entries],
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getEntries: builder.query<IPromptEntry[], { limit?: number }>({
      query: ({ limit = 100 }) => `entries?limit=${limit}`,
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
    getHelp: builder.mutation<IHelpersCard, string>({
      query: (input: string) => ({
        url: "helper",
        method: "POST",
        body: {
          input,
          languageFrom: "english",
          languageTo: "ukranian",
        },
      }),
    }),
  }),
})

export const { useGetEntriesQuery, useAddEntryMutation, useGetHelpMutation } =
  aiassistApi
