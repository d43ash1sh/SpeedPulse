import React from 'react';
import { Database, Share2 } from 'lucide-react';
import { TestControls } from '../components/speedtest/TestControls';
import { ProgressIndicator } from '../components/speedtest/ProgressIndicator';
import { ResultsDisplay } from '../components/speedtest/ResultsDisplay';
import { Card, CardContent } from '../components/ui/Card';
import { getBrowserInfo, getDeviceInfo } from '../utils/speedTestUtils';
import { Button } from '../components/ui/Button';
import { useAuthStore } from '../store/authStore';

export const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuthStore();
  
  const handleShare = () => {
    // Share functionality would be implemented here
    alert('Bhai, ruk ja thoda 😅 website abhi under construction mein hai 🛠️, thoda sabr rakh!');
  };

  const handleSaveResult = () => {
    if (!isAuthenticated) {
      alert('Please log in to save your results');
    } else {
      alert('Results saved to your profile');
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 animate-gradient bg-gradient-size">
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Test Your Internet Speed
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Check your connection's ping, download and upload speeds with our
              beautiful and accurate speed test.
            </p>
          </div>
          
          <div className="w-full max-w-4xl">
            <Card className="bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 shadow-xl mb-8">
              <CardContent className="py-8">
                <div className="mb-8">
                  <ResultsDisplay />
                </div>
                
                <div className="mb-8">
                  <ProgressIndicator />
                </div>
                
                <div className="flex justify-center">
                  <TestControls onShare={handleShare} />
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 shadow-md">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                    Connection Details
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Device</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {getDeviceInfo()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Browser</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {getBrowserInfo()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">IP Address</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        192.168.XX.XX
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">ISP</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        Example ISP
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 shadow-md">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                    Save & Share
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {isAuthenticated
                      ? 'Save your results to track your internet performance over time.'
                      : 'Log in to save your results and track your internet performance over time.'}
                  </p>
                  <div className="flex flex-col space-y-3">
                    <Button
                      variant="primary"
                      leftIcon={<Database size={18} />}
                      onClick={handleSaveResult}
                    >
                      Save Results
                    </Button>
                    <Button
                      variant="outline"
                      leftIcon={<Share2 size={18} />}
                      onClick={handleShare}
                    >
                      Share Results
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};