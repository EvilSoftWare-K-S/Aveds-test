import { tokens } from '@shared/utils/types';
interface User {
  id: string;
  login: string;
  name: string; 
}
export interface ProfileResponse {
  success?: boolean;
  tokens?: tokens;
  user?:User;
  message?: string;
}
