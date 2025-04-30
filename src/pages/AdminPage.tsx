import React from 'react';
import { Navigate } from 'react-router-dom';
import { Users, Activity, Server, Database } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { useAuthStore } from '../store/authStore';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
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
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export const AdminPage: React.FC = () => {
  const { isAuthenticated, user } = useAuthStore();
  
  // Redirect if not logged in or not admin
  if (!isAuthenticated || !user?.isAdmin) {
    return <Navigate to="/" replace />;
  }
  
  // Common chart options
  const lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: document.documentElement.classList.contains('dark') ? '#f3f4f6' : '#1f2937',
        }
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
  };
  
  const doughnutChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          color: document.documentElement.classList.contains('dark') ? '#f3f4f6' : '#1f2937',
        }
      },
    },
  };
  
  // Sample data for user growth
  const userLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const userGrowthData = {
    labels: userLabels,
    datasets: [
      {
        label: 'New Users',
        data: [65, 78, 90, 115, 132, 150, 168, 190, 212, 230, 252, 270],
        fill: false,
        borderColor: '#4f46e5',
        backgroundColor: 'rgba(79, 70, 229, 0.5)',
        tension: 0.4,
      },
    ],
  };
  
  // Sample data for tests per day
  const testLabels = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  });
  
  const testsPerDayData = {
    labels: testLabels,
    datasets: [
      {
        label: 'Tests Performed',
        data: [124, 135, 148, 142, 165, 182, 193],
        fill: false,
        borderColor: '#0d9488',
        backgroundColor: 'rgba(13, 148, 136, 0.5)',
        tension: 0.4,
      },
    ],
  };
  
  // Sample data for device distribution
  const deviceData = {
    labels: ['Desktop', 'Mobile', 'Tablet'],
    datasets: [
      {
        data: [55, 35, 10],
        backgroundColor: [
          'rgba(79, 70, 229, 0.7)',
          'rgba(13, 148, 136, 0.7)',
          'rgba(249, 115, 22, 0.7)',
        ],
        borderColor: [
          'rgba(79, 70, 229, 1)',
          'rgba(13, 148, 136, 1)',
          'rgba(249, 115, 22, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  
  // Sample data for browser distribution
  const browserData = {
    labels: ['Chrome', 'Firefox', 'Safari', 'Edge', 'Other'],
    datasets: [
      {
        data: [45, 20, 25, 8, 2],
        backgroundColor: [
          'rgba(79, 70, 229, 0.7)',
          'rgba(13, 148, 136, 0.7)',
          'rgba(249, 115, 22, 0.7)',
          'rgba(34, 197, 94, 0.7)',
          'rgba(239, 68, 68, 0.7)',
        ],
        borderColor: [
          'rgba(79, 70, 229, 1)',
          'rgba(13, 148, 136, 1)',
          'rgba(249, 115, 22, 1)',
          'rgba(34, 197, 94, 1)',
          'rgba(239, 68, 68, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  
  // Generate recent users
  const recentUsers = Array.from({ length: 5 }, (_, index) => ({
    id: `user-${index}`,
    name: `User ${index + 1}`,
    email: `user${index + 1}@example.com`,
    tests: Math.floor(Math.random() * 20) + 1,
    joined: new Date(Date.now() - (Math.random() * 90 * 24 * 60 * 60 * 1000)).toLocaleDateString(),
  }));
  
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen animate-gradient bg-gradient-size">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Admin Dashboard</h1>
          
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              icon={<Users size={24} />}
              title="Total Users"
              value="2,543"
              change="+12% from last month"
              isPositive={true}
            />
            <StatCard
              icon={<Activity size={24} />}
              title="Total Tests"
              value="48,294"
              change="+8% from last month"
              isPositive={true}
            />
            <StatCard
              icon={<Server size={24} />}
              title="Avg Download"
              value="86.7 Mbps"
              change="+2% from last month"
              isPositive={true}
            />
            <StatCard
              icon={<Database size={24} />}
              title="Server Load"
              value="42%"
              change="-5% from last month"
              isPositive={true}
            />
          </div>
          
          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card className="bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 shadow-lg">
              <CardHeader>
                <CardTitle>User Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <Line options={lineChartOptions} data={userGrowthData} />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 shadow-lg">
              <CardHeader>
                <CardTitle>Tests Per Day</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <Line options={lineChartOptions} data={testsPerDayData} />
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Device and Browser Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card className="bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 shadow-lg">
              <CardHeader>
                <CardTitle>Device Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <Doughnut options={doughnutChartOptions} data={deviceData} />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 shadow-lg">
              <CardHeader>
                <CardTitle>Browser Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <Doughnut options={doughnutChartOptions} data={browserData} />
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Recent Users */}
          <Card className="bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 shadow-lg">
            <CardHeader>
              <CardTitle>Recent Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-900">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">User</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Tests</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Joined</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {recentUsers.map((user) => (
                      <tr key={user.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                          {user.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {user.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {user.tests}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {user.joined}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value, change, isPositive }) => {
  return (
    <Card className="bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-500 dark:text-gray-400">{title}</span>
          <span className="text-primary-600 dark:text-primary-500">{icon}</span>
        </div>
        <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{value}</div>
        <div className={`text-sm ${isPositive ? 'text-success-600 dark:text-success-500' : 'text-error-600 dark:text-error-500'}`}>
          {change}
        </div>
      </CardContent>
    </Card>
  );
};