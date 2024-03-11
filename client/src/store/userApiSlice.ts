import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import type {RootState} from "./store";
import {setAuthAction, setError, setLoading, setProfileAction} from "./mainSlice";

const BASE_URL = 'http://localhost:3000/'

export const userApiSlice = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers, {getState}) => {
            const token = (getState() as RootState).mainSlice.auth.token;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getProfile: builder.query({
            query: () => ({url: 'auth/profile'}),
            async onQueryStarted(args, {dispatch, queryFulfilled}) {
                dispatch(setLoading(true));
                try {
                    const {data} = await queryFulfilled;
                    dispatch(setProfileAction(data.profile))
                } catch (e) {
                    console.log(e)
                    dispatch(setError(e.error?.data.statusCode + ": " + e.error?.data.message))
                } finally {
                    dispatch(setLoading(false));
                }
            }
        }),
        registerUser: builder.mutation<IAuth, IRegisterUser>({
            query: formData => ({
                url: 'auth/register',
                method: 'POST',
                body: formData
            }),
            async onQueryStarted(args, {dispatch, queryFulfilled}) {
                dispatch(setLoading(true));
                try {
                    const {data} = await queryFulfilled;
                    dispatch(setAuthAction(data))
                } catch (e) {
                    console.log(e)
                    dispatch(setError(e.error.data.statusCode + ": " + e.error.data.message))
                } finally {
                    dispatch(setLoading(false));
                }
            }
        })
    }),
});

export const {useRegisterUserMutation, useGetProfileQuery} = userApiSlice;