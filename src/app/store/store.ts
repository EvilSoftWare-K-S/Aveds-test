import { configureStore, combineReducers, PreloadedState } from '@reduxjs/toolkit';
import { useDispatch, useSelector, useStore, TypedUseSelectorHook } from 'react-redux';

import { modalReducer } from '@app/providers/model/ModalProvider';
import { authApi } from '@features/login-form/model/authApi';
import { profileApi } from '@features/button-signin-logout/model/profileApi';
import tokenReducer from '@features/login-form/model/tokenSlice';
// import { logoutApi } from '@features/button-signin-logout/model/logoutApi';

export const rootReducer = combineReducers({
  modalSelector: modalReducer,
  token: tokenReducer,
  [authApi.reducerPath]: authApi.reducer,
  [profileApi.reducerPath]: profileApi.reducer,
  // [logoutApi.reducerPath]: logoutApi.reducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([
        authApi.middleware,
        profileApi.middleware,
        // logoutApi.middleware,
      ]),
    preloadedState,
  });
};

export const store = setupStore();

export type AppStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore: () => AppStore = useStore;
