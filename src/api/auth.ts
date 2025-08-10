import type { ApiResponse, AuthResponseData } from '../types/user';
import axiosInstance from './axiosInstance';

// Register user
export const registerUser = async (
  name: string,
  email: string,
  password: string
): Promise<AuthResponseData> => {
  const response = await axiosInstance.post<ApiResponse<AuthResponseData>>('/register', {
    name,
    email,
    password,
  });

  if (response.data.error) {
    throw new Error(response.data.error);
  }

  return response.data.data!;
};

// Login user
export const loginUser = async (
  email: string,
  password: string
): Promise<AuthResponseData> => {
  const response = await axiosInstance.post<ApiResponse<AuthResponseData>>('/login', {
    email,
    password,
  });

  if (response.data.error) {
    throw new Error(response.data.error);
  }

  return response.data.data!;
};

// Logout user
export const logoutUser = async (): Promise<void> => {
  const response = await axiosInstance.post<ApiResponse<null>>('/logout');

  if (response.data.error) {
    throw new Error(response.data.error);
  }
};

// Fetch user profile
export const fetchUserProfile = async (): Promise<AuthResponseData> => {
  const response = await axiosInstance.get<ApiResponse<AuthResponseData>>('/user');

  if (response.data.error) {
    throw new Error(response.data.error);
  }

  return response.data.data!;
};

export interface VerifyOTPResponse {
  email: string;
  token: string;
}

export const resetPasswordRequest = async (email: string): Promise<void> => {
  const response = await axiosInstance.post<ApiResponse<null>>('/reset-password-request', { email });
  if (response.data.error) throw new Error(response.data.error);
};

export const verifyOTP = async (
  email: string,
  code: number
): Promise<VerifyOTPResponse> => {
  const response = await axiosInstance.post<ApiResponse<VerifyOTPResponse>>('/verify-otp', { email, code });
  if (response.data.error) throw new Error(response.data.error);
  return response.data.data!;
};

export const resetPassword = async (
  email: string,
  token: string,
  newPassword: string
): Promise<void> => {
  const response = await axiosInstance.post<ApiResponse<null>>('/reset-password', {
    email,
    token,
    new_password: newPassword,
  });
  if (response.data.error) throw new Error(response.data.error);
};