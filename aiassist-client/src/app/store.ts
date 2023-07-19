import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import promptSlice from "./prompt.slice"

import { setupListeners } from "@reduxjs/toolkit/query/react"
import { aiassistApi } from "./apis.slice"
import helpersSlice from "./helpers.slice"
import settingsSlice from "./settings.slice"

export const store = configureStore({
  reducer: {
    prompt: promptSlice,
    helpers: helpersSlice,
    settings: settingsSlice,
    [aiassistApi.reducerPath]: aiassistApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(aiassistApi.middleware),
})

setupListeners(store.dispatch)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
