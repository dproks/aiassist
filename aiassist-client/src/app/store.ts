import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import inputReducer from "@/app/input.slice"
import outputReducer from "@/app/output.slice"

export const store = configureStore({
	reducer: {
		input: inputReducer,
		output: outputReducer,
	},
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>
