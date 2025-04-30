export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  isAdmin: boolean;
}

export interface SpeedTestResult {
  id: string;
  userId: string;
  date: string;
  ping: number;
  download: number;
  upload: number;
  isp: string;
  ipAddress: string;
  location: string;
  device?: string;
  browser?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  clearErrors: () => void;
  error: string | null;
}

export interface ThemeState {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export interface SpeedTestState {
  isTestRunning: boolean;
  testPhase: 'idle' | 'ping' | 'download' | 'upload' | 'complete';
  progress: number;
  results: {
    ping: number | null;
    download: number | null;
    upload: number | null;
  };
  startTest: () => void;
  stopTest: () => void;
  resetTest: () => void;
}