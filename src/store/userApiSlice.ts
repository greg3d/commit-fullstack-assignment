import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import type {RootState} from "./store";
import {setAuthAction} from "./mainSlice";

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
            query: () => ({url: 'auth/profile'})
        }),
        registerUser: builder.mutation<IAuth, IRegisterUser>({
            query: formData => ({
                url: 'auth/register',
                method: 'POST',
                body: formData
            }),
            async onQueryStarted(args, {dispatch, queryFulfilled}) {
                try {
                    const {data} = await queryFulfilled;
                    dispatch(setAuthAction(data))
                } catch (e) {
                }
            }
        })
    }),
});

export const {useRegisterUserMutation, useGetProfileQuery} = userApiSlice;