export interface User {
  id: string;
  login: string;
  name: string;
  password?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface LoginRequest {
  login: string;
  password: string;
}

export interface AuthResponse {
  success: boolean,
  user: Omit<User, 'password'>;
  tokens: AuthTokens;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}