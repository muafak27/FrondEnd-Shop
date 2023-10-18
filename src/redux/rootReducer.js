import { combineReducers } from '@reduxjs/toolkit';
import persistedCartReducer from './persistedCartSlice';
import persistedAuthenticationReducer from './persistedAuthenticationSlice';
import { api, authenticatedApi } from '../services/api';

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  [authenticatedApi.reducerPath]: authenticatedApi.reducer,

  persistedCart: persistedCartReducer,

  persistedAuthentication: persistedAuthenticationReducer,
});

export default rootReducer;