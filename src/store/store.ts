import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import { authApi } from './features/auth/authApi';
import { cmsApi } from './features/cms/cmsApi';
import { hotelApi } from './features/hotel/hotelApi';
import { bookingApi } from './features/booking/bookingApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [cmsApi.reducerPath]: cmsApi.reducer,
    [hotelApi.reducerPath]: hotelApi.reducer,
    [bookingApi.reducerPath]: bookingApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      cmsApi.middleware,
      hotelApi.middleware,
      bookingApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
