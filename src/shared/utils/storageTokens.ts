import { tokens } from './types';

export const getToken = (): tokens | null => {
  const item = localStorage.getItem('tokens');
  if (item) {
    return JSON.parse(item);
  }
  return null;
};

export const removeToken = (): void => {
  return localStorage.removeItem('tokens');
};

export const setTokenR = (tokens: Omit<tokens, 'expiresIn'>): void => {
  return localStorage.setItem('tokens', JSON.stringify(tokens));
};

export const getTokenR = (): string | null => {
  const item = localStorage.getItem('tokens');
  return item;
};
