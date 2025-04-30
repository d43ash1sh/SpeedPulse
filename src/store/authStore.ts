import { create } from 'zustand';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { AuthState, User } from '../types';

// This would be replaced with your actual API URL
const API_URL = 'https://api.speedpulse.example/api';

export const useAuthStore = create<AuthState>((set) => {
  // Initialize auth state from localStorage if available
  const token = localStorage.getItem('token');
  let user = null;
  
  if (token) {
    try {
      const decoded = jwtDecode<{ user: User }>(token);
      user = decoded.user;
    } catch (error) {
      localStorage.removeItem('token');
    }
  }

  return {
    user,
    isAuthenticated: !!user,
    isLoading: false,
    token,
    error: null,

    login: async (email: string, password: string) => {
      set({ isLoading: true, error: null });
      try {
        // This would be replaced with actual API call
        const response = await axios.post(`${API_URL}/auth/login`, { email, password });
        const { token, user } = response.data;
        
        localStorage.setItem('token', token);
        set({ isAuthenticated: true, user, token, isLoading: false });
      } catch (error) {
        localStorage.removeItem('token');
        set({ 
          isLoading: false, 
          error: error instanceof Error ? error.message : 'Login failed. Please try again.' 
        });
      }
    },

    signup: async (name: string, email: string, password: string) => {
      set({ isLoading: true, error: null });
      try {
        // This would be replaced with actual API call
        const response = await axios.post(`${API_URL}/auth/signup`, { name, email, password });
        const { token, user } = response.data;
        
        localStorage.setItem('token', token);
        set({ isAuthenticated: true, user, token, isLoading: false });
      } catch (error) {
        set({ 
          isLoading: false, 
          error: error instanceof Error ? error.message : 'Signup failed. Please try again.' 
        });
      }
    },

    logout: () => {
      localStorage.removeItem('token');
      set({ isAuthenticated: false, user: null, token: null });
    },

    clearErrors: () => set({ error: null }),
  };
});