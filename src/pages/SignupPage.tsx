import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Gauge } from 'lucide-react';
import { SignupForm } from '../components/auth/SignupForm';
import { useAuthStore } from '../store/authStore';

export const SignupPage: React.FC = () => {
  const { isAuthenticated } = useAuthStore();
  
  // Redirect if already logged in
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 animate-gradient bg-gradient-size">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Link to="/" className="flex items-center">
            <Gauge className="h-12 w-12 text-primary-600 dark:text-primary-500" />
          </Link>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Create your SpeedPulse account
        </h2>
      </div>
      
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <SignupForm />
      </div>
    </div>
  );
};