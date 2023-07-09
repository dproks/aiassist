import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "@/app/store"
import { IPromptEntry } from "@/app/types"
import { aiassistApi } from "./apis.slice"

export interface IPromptState {
  inputValue: string
  status: string
  list: IPromptEntry[]
}

const initialState: IPromptState = { inputValue: "", status: "", list: [] }

export const promptSlice = createSlice({
  name: "prompt",
  initialState,
  reducers: {
    updateInputValue: (state, action: PayloadAction<string>) => {
      state.inputValue = action.payload
    },
    appendPromptEntry: (state, action: PayloadAction<IPromptEntry>) => {
      state.list = [...state.list, action.payload]
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      aiassistApi.endpoints.getEntries.matchFulfilled,
      (state, action: PayloadAction<any>) => {
        state.list = [...action.payload]
      },
    )
  },
})

export const { updateInputValue, appendPromptEntry } = promptSlice.actions

export const selectInputValue = (state: RootState) => state.prompt.inputValue
export const selectEntriesList = (state: RootState) => state.prompt.list

export default promptSlice.reducer
