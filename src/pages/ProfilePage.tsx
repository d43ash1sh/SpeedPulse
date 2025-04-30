import React from 'react';
import { Navigate } from 'react-router-dom';
import { User, Mail, Calendar, Settings, Download, Upload, Cable } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useAuthStore } from '../store/authStore';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Sample data for charts
const generateRandomData = (count: number, min: number, max: number) => {
  return Array.from({ length: count }, () => Math.floor(Math.random() * (max - min + 1)) + min);
};

const dates = Array.from({ length: 10 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (9 - i));
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
});

export const ProfilePage: React.FC = () => {
  const { isAuthenticated, user } = useAuthStore();
  
  // Redirect if not logged in
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }
  
  // Chart options
  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
        labels: {
          color: document.documentElement.classList.contains('dark') ? '#f3f4f6' : '#1f2937',
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        grid: {
          color: document.documentElement.classList.contains('dark') ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: document.documentElement.classList.contains('dark') ? '#f3f4f6' : '#1f2937',
        }
      },
      y: {
        grid: {
          color: document.documentElement.classList.contains('dark') ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: document.documentElement.classList.contains('dark') ? '#f3f4f6' : '#1f2937',
        }
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    }
  };
  
  // Sample chart data
  const downloadData = {
    labels: dates,
    datasets: [
      {
        label: 'Download (Mbps)',
        data: generateRandomData(10, 50, 150),
        borderColor: '#4f46e5',
        backgroundColor: 'rgba(79, 70, 229, 0.5)',
        tension: 0.4,
      },
    ],
  };
  
  const uploadData = {
    labels: dates,
    datasets: [
      {
        label: 'Upload (Mbps)',
        data: generateRandomData(10, 10, 50),
        borderColor: '#0d9488',
        backgroundColor: 'rgba(13, 148, 136, 0.5)',
        tension: 0.4,
      },
    ],
  };
  
  const pingData = {
    labels: dates,
    datasets: [
      {
        label: 'Ping (ms)',
        data: generateRandomData(10, 10, 100),
        borderColor: '#f97316',
        backgroundColor: 'rgba(249, 115, 22, 0.5)',
        tension: 0.4,
      },
    ],
  };
  
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen animate-gradient bg-gradient-size">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">My Profile</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* User Info */}
            <Card className="col-span-1 bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 shadow-lg">
              <CardHeader>
                <CardTitle>User Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center">
                    <User size={18} className="text-primary-600 dark:text-primary-500 mr-2" />
                    <span className="text-gray-500 dark:text-gray-400 mr-2">Name:</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">{user.name}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail size={18} className="text-primary-600 dark:text-primary-500 mr-2" />
                    <span className="text-gray-500 dark:text-gray-400 mr-2">Email:</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">{user.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar size={18} className="text-primary-600 dark:text-primary-500 mr-2" />
                    <span className="text-gray-500 dark:text-gray-400 mr-2">Member since:</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="pt-4">
                    <Button
                      variant="outline"
                      leftIcon={<Settings size={18} />}
                      fullWidth
                    >
                      Account Settings
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Speed Test Summary */}
            <Card className="col-span-1 lg:col-span-2 bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 shadow-lg">
              <CardHeader>
                <CardTitle>Speed Test Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                  <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg flex items-center">
                    <Download size={20} className="text-primary-600 dark:text-primary-500 mr-3" />
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Avg Download</div>
                      <div className="text-lg font-bold text-gray-900 dark:text-white">82.5 Mbps</div>
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg flex items-center">
                    <Upload size={20} className="text-secondary-600 dark:text-secondary-500 mr-3" />
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Avg Upload</div>
                      <div className="text-lg font-bold text-gray-900 dark:text-white">24.8 Mbps</div>
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg flex items-center">
                    <Cable size={20} className="text-accent-600 dark:text-accent-500 mr-3" />
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Avg Ping</div>
                      <div className="text-lg font-bold text-gray-900 dark:text-white">28 ms</div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Total Tests: 24
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-sm">
                      <span className="text-gray-500 dark:text-gray-400">Last test:</span>{' '}
                      <span className="font-medium text-gray-900 dark:text-white">Today, 2:45 PM</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-500 dark:text-gray-400">First test:</span>{' '}
                      <span className="font-medium text-gray-900 dark:text-white">April 10, 2023</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Charts */}
            <Card className="col-span-1 lg:col-span-3 bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 shadow-lg">
              <CardHeader>
                <CardTitle>Speed History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="h-64">
                    <h3 className="text-base font-medium text-gray-900 dark:text-white mb-2">Download Speed</h3>
                    <Line options={chartOptions} data={downloadData} height={200} />
                  </div>
                  <div className="h-64">
                    <h3 className="text-base font-medium text-gray-900 dark:text-white mb-2">Upload Speed</h3>
                    <Line options={chartOptions} data={uploadData} height={200} />
                  </div>
                  <div className="h-64">
                    <h3 className="text-base font-medium text-gray-900 dark:text-white mb-2">Ping</h3>
                    <Line options={chartOptions} data={pingData} height={200} />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Recent Tests */}
            <Card className="col-span-1 lg:col-span-3 bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 shadow-lg">
              <CardHeader>
                <CardTitle>Recent Tests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-900">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Download</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Upload</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Ping</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">ISP</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            {new Date(Date.now() - index * 24 * 60 * 60 * 1000).toLocaleDateString()} {index === 0 ? '(Today)' : ''}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            {Math.floor(Math.random() * 100) + 50} Mbps
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            {Math.floor(Math.random() * 40) + 10} Mbps
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            {Math.floor(Math.random() * 90) + 10} ms
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            Example ISP
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};