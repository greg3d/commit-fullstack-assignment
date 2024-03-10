import type {Action, ThunkAction} from "@reduxjs/toolkit"
import {combineSlices, configureStore} from "@reduxjs/toolkit"
import {setupListeners} from "@reduxjs/toolkit/query"
import {userApiSlice} from "./userApiSlice";
import {mainSlice} from "./mainSlice";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

const rootReducer = combineSlices(mainSlice, userApiSlice)
export type RootState = ReturnType<typeof rootReducer>

export const makeStore = (preloadedState?: Partial<RootState>) => {
    const store = configureStore({
        reducer: rootReducer,
        middleware: getDefaultMiddleware => {
            return getDefaultMiddleware().concat(userApiSlice.middleware)
        },
        preloadedState,
    })

    // optional, but required for `refetchOnFocus`/`refetchOnReconnect` behaviors
    setupListeners(store.dispatch)
    return store
}

export const store = makeStore()

// Infer the type of `store`
export type AppStore = typeof store
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"]
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppThunk<ThunkReturnType = void> = ThunkAction<
    ThunkReturnType,
    RootState,
    unknown,
    Action
>
