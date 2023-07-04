import { createAsyncThunk } from "@reduxjs/toolkit"
import { getIndex, postPromptInput } from "@/utils/api"
import { IOutputEntry } from "./types"

export const getIndexResponse = createAsyncThunk("input/getIndex", async () => {
	const response = await getIndex()
	return response
})

export const getInputPromptResponse = createAsyncThunk(
	"input/postInput",
	async (entry: IOutputEntry) => {
		const response = await postPromptInput(entry)
		return response
	},
)
