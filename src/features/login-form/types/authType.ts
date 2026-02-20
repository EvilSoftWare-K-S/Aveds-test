export interface LoginFormData {
  login: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginRequest {
  login: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  token?: string;
  message?: string;
}