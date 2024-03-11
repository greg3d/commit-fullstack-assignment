import {createSlice} from "@reduxjs/toolkit";

const initialState: IState = {
    auth: {
        username: "",
        token: ""
    },
    profile: undefined,
    isLoading: false,
    error: "",
    tab: 0
}

export const mainSlice = createSlice({
    name: 'mainSlice',
    initialState,
    reducers: {
        setLoading(state, action) {
            state.isLoading = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        },
        ackError(state, action) {
            state.error = "";
        },
        setTab(state, action) {
            state.tab = action.payload;
        },
        setAuthAction(state: IState, action: { payload: IAuth, type: string }) {
            state.auth = action.payload;
            console.log("auth: " + action.payload.token);
        },
        setProfileAction(state: IState, action: { payload: IProfile, type: string }) {
            state.profile = action.payload;
            console.log("profile: " + action.payload.username);
        }
    }
})
export const {setAuthAction, setProfileAction, setLoading, setError, ackError, setTab} = mainSlice.actions;