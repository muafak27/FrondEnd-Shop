import { createSlice } from '@reduxjs/toolkit';

const persistedAuthenticationSlice = createSlice({
    name: 'persistedAuthentication', 
    initialState: {
        isLoggedIn: false, 
        user: {}, 
        token: null, 
    },
    reducers: {
        setAuthenticated: (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn;
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.token = null;
        },
    },
});

export const { setAuthenticated, logout } = persistedAuthenticationSlice.actions;

export default persistedAuthenticationSlice.reducer;