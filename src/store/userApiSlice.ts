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
            //const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjQsInVzZXJuYW1lIjoic2VyZ2V5IiwiaWF0IjoxNzEwMDc2NDIyLCJleHAiOjE3MTAwODAwMjJ9.HTfUyRVY_bM_2toPBb-d9qSlRwrMKyKnsmcnSAbSjKk"
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