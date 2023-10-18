import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'http://localhost:3001';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (credentials) => ({
                url: '/auth/register',
                method: 'POST',
                body: credentials,
            }),
        }),
        login: builder.mutation({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),
        }),
    }),
});

export const authenticatedApi = createApi({
    reducerPath: 'authenticatedApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().persistedAuthentication.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        addAddress: builder.mutation({
            query: (credentials) => ({
                url: '/api/delivery-address',
                method: 'POST',
                body: credentials,
            }),
        }),
        viewAddress: builder.query({
            query: () => '/api/delivery-address',
        }),
        editAddress: builder.mutation({
            query: (credentials) => ({
                url: '/api/delivery-address/' + credentials.id,
                method: 'PUT',
                body: credentials.data,
            }),
        }),
        deleteAddress: builder.mutation({
            query: (id) => ({
                url: '/api/delivery-address/' + id,
                method: 'DELETE',
            }),
        }),
    }),
});


export const { useRegisterMutation, useLoginMutation } = api;
export const { useAddAddressMutation, useViewAddressQuery, useEditAddressMutation, useDeleteAddressMutation } = authenticatedApi;