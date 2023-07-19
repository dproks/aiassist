import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "@/app/store"
import { aiassistApi } from "./apis.slice"
import { IUserSettings } from "./types"

export interface IUserSettingsState {
  isSettingsModalOpen: boolean
  fields: IUserSettings
}

const initialState: IUserSettingsState = {
  isSettingsModalOpen: false,
  fields: {
    originLanguage: "",
    targetLanguage: "",
    messagesLimit: 10,
  },
}

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setIsSettingsModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isSettingsModalOpen = action.payload
    },
    setOriginLanguage: (state, action: PayloadAction<string>) => {
      state.fields.originLanguage = action.payload
    },
    setTargetLanguage: (state, action: PayloadAction<string>) => {
      state.fields.targetLanguage = action.payload
    },
    setMessagesLimit: (state, action: PayloadAction<number>) => {
      state.fields.messagesLimit = action.payload
    },
    setSettings: (state, action: PayloadAction<IUserSettings>) => {
      state.fields = {
        ...state.fields,
        ...action.payload,
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        aiassistApi.endpoints.getUserSettings.matchFulfilled,
        (state, action: PayloadAction<IUserSettings>) => {
          state.fields = action.payload
        },
      )
      .addMatcher(
        aiassistApi.endpoints.setUserSettings.matchFulfilled,
        (state, action: PayloadAction<IUserSettings>) => {
          state.fields = action.payload
        },
      )
  },
})

export const {
  setIsSettingsModalOpen,
  setOriginLanguage,
  setTargetLanguage,
  setMessagesLimit,
  setSettings,
} = settingsSlice.actions

export const selectIsSettingsModalOpen = (state: RootState) =>
  state.settings.isSettingsModalOpen
export const selectSettingsFields = (state: RootState) => state.settings.fields

export default settingsSlice.reducer
