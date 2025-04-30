import React from 'react';
import { Download, Upload, Cable } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { SpeedGauge } from './SpeedGauge';
import { useSpeedTestStore } from '../../store/speedTestStore';
import { formatPing, formatSpeed, getPingQuality, getSpeedQuality } from '../../utils/speedTestUtils';

export const ResultsDisplay: React.FC = () => {
  const { results, testPhase } = useSpeedTestStore();
  const { ping, download, upload } = results;
  
  // Only show results if test has completed or is in progress
  const showResults = testPhase !== 'idle';
  
  if (!showResults) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        Start the test to see your results
      </div>
    );
  }
  
  const pingQuality = getPingQuality(ping);
  const downloadQuality = getSpeedQuality(download, 'download');
  const uploadQuality = getSpeedQuality(upload, 'upload');
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl mx-auto">
      <Card className="flex flex-col items-center justify-center py-4">
        <CardContent>
          <SpeedGauge
            value={ping}
            maxValue={200}
            label="PING"
            unit="ms"
            quality={pingQuality}
            isAnimated={testPhase === 'ping' || testPhase === 'complete'}
          />
        </CardContent>
      </Card>
      
      <Card className="flex flex-col items-center justify-center py-4">
        <CardContent>
          <SpeedGauge
            value={download}
            maxValue={300}
            label="DOWNLOAD"
            unit="Mbps"
            quality={downloadQuality}
            isAnimated={testPhase === 'download' || testPhase === 'complete'}
          />
        </CardContent>
      </Card>
      
      <Card className="flex flex-col items-center justify-center py-4">
        <CardContent>
          <SpeedGauge
            value={upload}
            maxValue={150}
            label="UPLOAD"
            unit="Mbps"
            quality={uploadQuality}
            isAnimated={testPhase === 'upload' || testPhase === 'complete'}
          />
        </CardContent>
      </Card>
      
      {testPhase === 'complete' && (
        <div className="col-span-1 md:col-span-3 mt-2">
          <Card>
            <CardContent className="py-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="flex justify-center mb-2">
                    <Cable size={20} className="text-primary-600 dark:text-primary-500" />
                  </div>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">PING</div>
                  <div className="text-lg font-bold">{formatPing(ping)}</div>
                </div>
                
                <div>
                  <div className="flex justify-center mb-2">
                    <Download size={20} className="text-primary-600 dark:text-primary-500" />
                  </div>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">DOWNLOAD</div>
                  <div className="text-lg font-bold">{formatSpeed(download)}</div>
                </div>
                
                <div>
                  <div className="flex justify-center mb-2">
                    <Upload size={20} className="text-primary-600 dark:text-primary-500" />
                  </div>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-400">UPLOAD</div>
                  <div className="text-lg font-bold">{formatSpeed(upload)}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};