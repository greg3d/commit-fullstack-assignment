import {createSlice} from "@reduxjs/toolkit";

const initialState: IState = {
    auth: {
        username: "",
        token: ""
    },
    profile: undefined,
    isLoading: false,
    error: null
}

export const mainSlice = createSlice({
    name: 'mainSlice',
    initialState,
    reducers: {
        setLoading(state, action) {
            state.isLoading = action.payload
        },
        setError(state, action) {
            state.error = action.payload
        },
        setAuthAction(state: IState, action: { payload: IAuth, type: string }) {
            state.auth = action.payload;
            console.log("auth: " + action.payload);
        },
        setProfileAction(state: IState, action: { payload: IProfile, type: string }) {
            state.profile = action.payload;
            console.log("profile: " + action.payload);
        }
    },
})

export const {setAuthAction, setProfileAction, setLoading, setError} = mainSlice.actions;