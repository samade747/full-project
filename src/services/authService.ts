// frontend/src/services/authService.ts
import axios from 'axios';
import { SignupData, LoginData, User, AuthSuccessResponse, ErrorResponse } from '../types/user';

// Get backend URL from window config or use default
const getApiUrl = () => {
  // Server-side rendering fallback
  if (typeof window === 'undefined') return 'http://localhost:8000';

  // Check for runtime config (set by Vercel or custom script)
  if ((window as any).BACKEND_API_URL) {
    return (window as any).BACKEND_API_URL;
  }

  // Fallback to localhost for development
  return 'http://localhost:8000';
};

const API_URL = getApiUrl();
const AUTH_API_ENDPOINT = `${API_URL}/api/auth`;


// Create an Axios instance for the auth API
const authApi = axios.create({
  baseURL: AUTH_API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a response interceptor for global error handling
authApi.interceptors.response.use(
  (response) => response,
  (error) => {
    // This is where global error handling can occur
    console.error("API call failed:", error.response || error);

    // Extract a more user-friendly message
    const errorMessage = error.response?.data?.detail || error.message || 'An unexpected error occurred.';

    // Re-throw the error with a custom message so individual calls can catch it
    // or further process it if needed.
    return Promise.reject(new Error(errorMessage));
  }
);

const saveUserData = (token: string, user: User) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }
};

const clearUserData = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

const getToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
};

const getUser = (): User | null => {
  if (typeof window === 'undefined') return null;
  try {
    const user = localStorage.getItem('user');
    if (user === 'undefined' || user === 'null') return null;
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error("Error parsing user from localStorage:", error);
    return null;
  }
};

const signup = async (data: SignupData): Promise<AuthSuccessResponse> => {
  const response = await authApi.post<AuthSuccessResponse>('/signup', data);
  const { token, user } = response.data;
  saveUserData(token, user);
  return response.data;
};

const login = async (data: LoginData): Promise<AuthSuccessResponse> => {
  const response = await authApi.post<AuthSuccessResponse>('/login', data);
  const { token, user } = response.data;
  saveUserData(token, user);
  return response.data;
};

const getMe = async (): Promise<User | null> => {
  const token = getToken();
  if (!token) {
    clearUserData();
    return null;
  }
  try {
    const response = await authApi.get<User>('/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user data (token likely invalid):", error);
    clearUserData(); // Clear invalid token data
    return null;
  }
};

const logout = () => {
  clearUserData();
};

export const authService = {
  signup,
  login,
  getMe,
  logout,
  getToken,
  getUser,
};