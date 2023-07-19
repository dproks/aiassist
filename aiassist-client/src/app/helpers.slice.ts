import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "@/app/store"
import { IHelpersCard } from "@/app/types"
import { aiassistApi } from "./apis.slice"

export interface IHelpersState {
  list: IHelpersCard[]
  card: IHelpersCard | null
  isLoading: boolean
}

const initialState: IHelpersState = { list: [], card: null, isLoading: false }

export const helpersSlice = createSlice({
  name: "helper",
  initialState,
  reducers: {
    appendHelpersCard: (state, action: PayloadAction<IHelpersCard>) => {
      state.list = [...state.list, action.payload]
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      aiassistApi.endpoints.getHelp.matchFulfilled,
      (state, action: PayloadAction<any>) => {
        state.isLoading = false
        state.card = action.payload
      },
    ),
      builder.addMatcher(
        aiassistApi.endpoints.getHelp.matchPending,
        (state) => {
          state.isLoading = true
        },
      )
  },
})

export const { appendHelpersCard } = helpersSlice.actions

export const selectHelpersList = (state: RootState) => state.helpers.list
export const selectHelpersCard = (state: RootState) => state.helpers.card
export const selectHelpersIsLoading = (state: RootState) =>
  state.helpers.isLoading

export default helpersSlice.reducer
