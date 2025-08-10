// src/types/user.ts
export interface User {
  id: number;
  name: string;
  email: string;
}

export interface AuthResponseData {
  user: User;
  token?: string;    // token present on login/register responses
  roles: string[];
}

export interface ApiResponse<T> {
  data: T | null;
  message: string | null;
  error: string | null;
  errors: Array<{ field: string; message: string }>;
  status: number;
}
