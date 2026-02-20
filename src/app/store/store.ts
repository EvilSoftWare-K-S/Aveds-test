import { configureStore, combineReducers, PreloadedState } from '@reduxjs/toolkit';
import { useDispatch, useSelector, useStore, TypedUseSelectorHook } from 'react-redux';

import { modalReducer } from '@app/providers/model/ModalProvider';
import { authApi } from '@features/login-form/model/authApi';
export const rootReducer = combineReducers({
      modalSelector: modalReducer,
       [authApi.reducerPath]: authApi.reducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([
        authApi.middleware,
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
