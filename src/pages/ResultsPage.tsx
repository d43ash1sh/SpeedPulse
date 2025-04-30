import React from 'react';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { useAuthStore } from '../store/authStore';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Sample data for the chart
const generateRandomData = (count: number, min: number, max: number) => {
  return Array.from({ length: count }, () => Math.floor(Math.random() * (max - min + 1)) + min);
};

export const ResultsPage: React.FC = () => {
  const { isAuthenticated } = useAuthStore();
  
  // Redirect if not logged in
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // Dates for the chart
  const dates = Array.from({ length: 10 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (9 - i));
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  });
  
  // Chart data
  const chartData = {
    labels: dates,
    datasets: [
      {
        label: 'Download (Mbps)',
        data: generateRandomData(10, 50, 150),
        backgroundColor: 'rgba(79, 70, 229, 0.6)',
      },
      {
        label: 'Upload (Mbps)',
        data: generateRandomData(10, 10, 50),
        backgroundColor: 'rgba(13, 148, 136, 0.6)',
      },
    ],
  };
  
  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: document.documentElement.classList.contains('dark') ? '#f3f4f6' : '#1f2937',
        }
      },
      tooltip: {
        mode: 'index' as const,
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
  };
  
  // Generate sample test results
  const testResults = Array.from({ length: 10 }, (_, index) => ({
    id: `test-${index}`,
    date: dates[index],
    download: generateRandomData(1, 50, 150)[0],
    upload: generateRandomData(1, 10, 50)[0],
    ping: generateRandomData(1, 10, 100)[0],
    isp: 'Example ISP',
    location: 'New York, USA',
  }));
  
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen animate-gradient bg-gradient-size">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Your Speed Test Results</h1>
          
          <div className="grid grid-cols-1 gap-6">
            {/* Summary Card */}
            <Card className="bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 shadow-lg">
              <CardHeader>
                <CardTitle>Speed Test Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Total Tests</div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">24</div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Avg Download</div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">82.5 Mbps</div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Avg Upload</div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">24.8 Mbps</div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Avg Ping</div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">28 ms</div>
                  </div>
                </div>
                
                <div className="h-80">
                  <Bar options={chartOptions} data={chartData} height={300} />
                </div>
              </CardContent>
            </Card>
            
            {/* Detailed Results Table */}
            <Card className="bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 shadow-lg">
              <CardHeader>
                <CardTitle>Test History</CardTitle>
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
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Location</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {testResults.map((result) => (
                        <tr key={result.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            {result.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            {result.download} Mbps
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            {result.upload} Mbps
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            {result.ping} ms
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            {result.isp}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                            {result.location}
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