import {createApi, fetchBaseQuery, TagDescription} from "@reduxjs/toolkit/query/react";
import type {RootState} from "./store";
import {setAuthAction, setError, setLoading, setProfileAction} from "./mainSlice";

const BASE_URL = 'http://localhost:3000/'

type ProfileResponse = {profile: IProfile}

export const userApiSlice = createApi({
    reducerPath: "userApi",
    invalidationBehavior: "immediately",
    tagTypes: ['Profile'],
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
        getProfile: builder.query<ProfileResponse, undefined>({
            query: (arg) => ({url: 'auth/profile'}),
            providesTags: () => ['Profile'],
            async onQueryStarted(args, {dispatch, queryFulfilled}) {
                dispatch(setLoading(true));
                try {
                    const {data} = await queryFulfilled;
                    dispatch(setProfileAction(data.profile))
                } catch (e) {
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
            invalidatesTags: () => ['Profile'],
            async onQueryStarted(args, {dispatch, queryFulfilled}) {
                dispatch(setLoading(true));
                try {
                    const {data} = await queryFulfilled;
                    dispatch(setAuthAction(data))
                } catch (e) {
                    dispatch(setError(e.error.data.statusCode + ": " + e.error.data.message))
                } finally {
                    dispatch(setLoading(false));
                }
            }
        })
    })
});

export const {useRegisterUserMutation, useGetProfileQuery} = userApiSlice;