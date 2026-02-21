import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getTokenR, removeToken, setTokenR } from '@shared/utils/storageTokens';
import { tokens } from '@shared/utils/types';
type Tokens = Omit<tokens, 'expiresIn'>;

interface TokenState {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
}

const getInitialState = (): TokenState => {
  const storedTokens = getTokenR();
  if (storedTokens) {
    const tokens = JSON.parse(storedTokens);
    return {
      accessToken: tokens.accessToken || null,
      refreshToken: tokens.refreshToken || null,
      isAuthenticated: !!tokens.accessToken,
    };
  }

  return {
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
  };
};

const tokenSlice = createSlice({
  name: 'token',
  initialState: getInitialState(),
  reducers: {
    setTokens: (state, action: PayloadAction<Tokens>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken || null;
      state.isAuthenticated = true;
      setTokenR({
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      });
    },
    setTokensNotRemember: (state, action: PayloadAction<Tokens>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken || null;
      state.isAuthenticated = true;
    },

    clearTokens: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      removeToken();
    },
  },
});

export const { setTokens, setTokensNotRemember, clearTokens } = tokenSlice.actions;

export const selectAccessToken = (state: { token: TokenState }) => state.token.accessToken;
export const selectRefreshToken = (state: { token: TokenState }) => state.token.refreshToken;
export const selectIsAuthenticated = (state: { token: TokenState }) => state.token.isAuthenticated;

export default tokenSlice.reducer;
