import React from 'react';
import { Play, Square, RotateCw, Share2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { useSpeedTestStore } from '../../store/speedTestStore';

interface TestControlsProps {
  onShare?: () => void;
}

export const TestControls: React.FC<TestControlsProps> = ({ onShare }) => {
  const { isTestRunning, testPhase, startTest, stopTest, resetTest } = useSpeedTestStore();
  
  const handleStartClick = () => {
    if (testPhase === 'complete') {
      resetTest();
      setTimeout(() => {
        startTest();
      }, 200);
    } else {
      startTest();
    }
  };
  
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {isTestRunning ? (
        <Button
          variant="primary"
          size="lg"
          leftIcon={<Square size={20} />}
          onClick={stopTest}
        >
          Stop Test
        </Button>
      ) : (
        <Button
          variant="primary"
          size="lg"
          leftIcon={<Play size={20} />}
          onClick={handleStartClick}
        >
          {testPhase === 'complete' ? 'Test Again' : 'Start Test'}
        </Button>
      )}
      
      {testPhase === 'complete' && (
        <>
          <Button
            variant="outline"
            size="lg"
            leftIcon={<RotateCw size={20} />}
            onClick={resetTest}
          >
            Reset
          </Button>
          
          {onShare && (
            <Button
              variant="secondary"
              size="lg"
              leftIcon={<Share2 size={20} />}
              onClick={onShare}
            >
              Share Results
            </Button>
          )}
        </>
      )}
    </div>
  );
};