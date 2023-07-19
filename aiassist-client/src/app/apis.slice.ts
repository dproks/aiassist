import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import {
  IPromptEntry,
  ETagTypes,
  ETagIDs,
  IHelpersCard,
  IUserSettings,
} from "./types"

const baseUrl = "http://localhost:3100/api"

export const aiassistApi = createApi({
  reducerPath: "aiassistApi",
  tagTypes: [ETagTypes.entries],
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getEntries: builder.query<IPromptEntry[], { limit?: number }>({
      query: ({ limit = 100 }) => `entry?limit=${limit}`,
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
    addEntry: builder.mutation<void, string>({
      query: (value: string) => ({
        url: "entry",
        method: "POST",
        body: { value },
      }),
      invalidatesTags: [{ type: ETagTypes.entries, id: ETagIDs.entriesList }],
    }),
    getHelp: builder.mutation<IHelpersCard, string>({
      query: (input: string) => ({
        url: "helper",
        method: "POST",
        body: { input },
      }),
    }),
    getUserSettings: builder.query<IUserSettings, void>({
      query: () => "settings",
    }),
    setUserSettings: builder.mutation<IUserSettings, IUserSettings>({
      query: (settings: IUserSettings) => ({
        url: "settings",
        method: "POST",
        body: settings,
      }),
    }),
  }),
})

export const {
  useGetEntriesQuery,
  useAddEntryMutation,
  useGetHelpMutation,
  useGetUserSettingsQuery,
  useSetUserSettingsMutation,
} = aiassistApi
