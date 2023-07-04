import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "@/app/store"
import { getInputPromptResponse } from "@/app/actions"
import { EEntryTypes, IOutputEntry } from "@/app/types"
import { generateEntry } from "@/utils/utils"
import { getIndexResponse } from "@/app/actions"

export interface IOutputState {
	value: string
	status: string
	list: IOutputEntry[]
}

const initialState: IOutputState = { value: "", status: "", list: [] }

export const inputSlice = createSlice({
	name: "output",
	initialState,
	reducers: {
		updateOutputValue: (state, action: PayloadAction<string>) => {
			state.value = action.payload
		},
		appendOutputEntry: (state, action: PayloadAction<IOutputEntry>) => {
			state.list = [...state.list, action.payload]
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getInputPromptResponse.pending, (state) => {
				state.status = "loading"
			})
			.addCase(getInputPromptResponse.fulfilled, (state, action) => {
				state.status = "idle"
				state.value = action.payload
				state.list = [...state.list, action.payload]
			})
			.addCase(getInputPromptResponse.rejected, (state) => {
				state.status = "failed"
			})
			.addCase(getIndexResponse.pending, (state) => {
				state.status = "loading"
			})
			.addCase(getIndexResponse.fulfilled, (state, action) => {
				state.status = "idle"
				console.log(action.payload)
				state.list = [...action.payload.data]
			})
			.addCase(getIndexResponse.rejected, (state) => {
				state.status = "failed"
			})
	},
})

export const { updateOutputValue, appendOutputEntry } = inputSlice.actions

export const selectOutputValue = (state: RootState) => state.output.value
export const selectOutputValuesList = (state: RootState) => state.output.list

export default inputSlice.reducer
