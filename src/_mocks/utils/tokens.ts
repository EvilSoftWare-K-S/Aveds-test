const ACCESS_TOKEN_SECRET = 'mock-access-secret';
const REFRESH_TOKEN_SECRET = 'mock-refresh-secret';

export const refreshTokenStore: Map<string, { userId: string; expiresAt: number }> = new Map();

const ACCESS_TOKEN_EXPIRY = 15 * 60 * 1000; // 15 минут
const REFRESH_TOKEN_EXPIRY = 7 * 24 * 60 * 60 * 1000; // 7 дней

const encodeBase64 = (str: string): string => {
  try {
    return btoa(str);
  } catch {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) => 
      String.fromCharCode(parseInt(p1, 16))
    ));
  }
};

const decodeBase64 = (str: string): string => {
  try {
    return atob(str);
  } catch {
    return decodeURIComponent(atob(str).split('').map(c => 
      '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    ).join(''));
  }
};

export const generateToken = (userId: string, secret: string, expiresIn: number): string => {
  const payload = {
    userId,
    exp: Date.now() + expiresIn,
    secret,
  };
  return encodeBase64(JSON.stringify(payload));
};

export const decodeToken = (token: string): { userId: string; exp: number } | null => {
  try {
    const payload = JSON.parse(decodeBase64(token));
    if (payload.exp < Date.now()) {
      return null;
    }
    
    return payload;
  } catch {
    return null;
  }
};

export const generateTokens = (userId: string): { accessToken: string; refreshToken: string; expiresIn: number } => {
  const accessToken = generateToken(userId, ACCESS_TOKEN_SECRET, ACCESS_TOKEN_EXPIRY);
  const refreshToken = generateToken(userId, REFRESH_TOKEN_SECRET, REFRESH_TOKEN_EXPIRY);

  refreshTokenStore.set(refreshToken, {
    userId,
    expiresAt: Date.now() + REFRESH_TOKEN_EXPIRY,
  });
  
  return {
    accessToken,
    refreshToken,
    expiresIn: ACCESS_TOKEN_EXPIRY,
  };
};

export const refreshAccessToken = (refreshToken: string): { accessToken: string; expiresIn: number } | null => {
  const tokenData = refreshTokenStore.get(refreshToken);
  
  if (!tokenData) {
    return null;
  }
  
  if (tokenData.expiresAt < Date.now()) {
    refreshTokenStore.delete(refreshToken);
    return null;
  }

  const accessToken = generateToken(tokenData.userId, ACCESS_TOKEN_SECRET, ACCESS_TOKEN_EXPIRY);
  
  return {
    accessToken,
    expiresIn: ACCESS_TOKEN_EXPIRY,
  };
};

export const invalidateRefreshToken = (refreshToken: string): boolean => {
  return refreshTokenStore.delete(refreshToken);
};

export const cleanExpiredTokens = (): void => {
  const now = Date.now();
  for (const [token, data] of refreshTokenStore.entries()) {
    if (data.expiresAt < now) {
      refreshTokenStore.delete(token);
    }
  }
};