import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "@/app/store"

export interface IInputState {
  value: string
  status: string
}

const initialState: IInputState = { value: "", status: "" }

export const inputSlice = createSlice({
  name: "input",
  initialState,
  reducers: {
    updateInputValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    },
  },
})

export const { updateInputValue } = inputSlice.actions

export const selectInputValue = (state: RootState) => state.input.value

export default inputSlice.reducer
