import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Gauge, Moon, Sun, LogIn, UserCircle, LogOut, BarChart } from 'lucide-react';
import { Toggle } from '../ui/Toggle';
import { Button } from '../ui/Button';
import { useThemeStore } from '../../store/themeStore';
import { useAuthStore } from '../../store/authStore';

export const Navbar: React.FC = () => {
  const { isDarkMode, toggleTheme } = useThemeStore();
  const { isAuthenticated, user, logout } = useAuthStore();
  const location = useLocation();
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Gauge className="h-8 w-8 text-primary-600 dark:text-primary-500" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">SpeedPulse</span>
          </Link>
          <nav className="ml-10 hidden space-x-8 md:flex">
            <NavLink to="/" label="Test" isActive={location.pathname === '/'} />
            <NavLink to="/results" label="Results" isActive={location.pathname === '/results'} />
            {isAuthenticated && user?.isAdmin && (
              <NavLink to="/admin" label="Admin" isActive={location.pathname === '/admin'} />
            )}
          </nav>
        </div>
        
        <div className="flex items-center space-x-4">
          <Toggle
            isEnabled={isDarkMode}
            onChange={toggleTheme}
            label=""
            className="mr-2"
          />
          <span className="text-gray-700 dark:text-gray-300">
            {isDarkMode ? <Moon size={18} /> : <Sun size={18} />}
          </span>
          
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <Link to="/profile">
                <Button
                  variant="ghost"
                  leftIcon={<UserCircle size={18} />}
                  className="text-sm"
                >
                  Profile
                </Button>
              </Link>
              <Button
                variant="outline"
                leftIcon={<LogOut size={18} />}
                className="text-sm"
                onClick={logout}
              >
                Logout
              </Button>
            </div>
          ) : (
            <Link to="/login">
              <Button
                variant="primary"
                leftIcon={<LogIn size={18} />}
                className="text-sm"
              >
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

interface NavLinkProps {
  to: string;
  label: string;
  isActive: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ to, label, isActive }) => {
  return (
    <Link
      to={to}
      className={`text-sm font-medium transition-colors hover:text-primary-600 dark:hover:text-primary-500 ${
        isActive 
        ? 'text-primary-600 dark:text-primary-500' 
        : 'text-gray-700 dark:text-gray-300'
      }`}
    >
      {label}
    </Link>
  );
};