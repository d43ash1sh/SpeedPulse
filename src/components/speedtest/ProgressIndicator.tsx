import React from 'react';
import { useSpeedTestStore } from '../../store/speedTestStore';

export const ProgressIndicator: React.FC = () => {
  const { isTestRunning, testPhase, progress } = useSpeedTestStore();
  
  const phases = [
    { id: 'ping', label: 'Ping' },
    { id: 'download', label: 'Download' },
    { id: 'upload', label: 'Upload' },
    { id: 'complete', label: 'Complete' },
  ];
  
  // If test is not running and not complete, show empty progress
  if (!isTestRunning && testPhase === 'idle') {
    return (
      <div className="w-full">
        <div className="flex justify-between mb-2">
          {phases.map((phase) => (
            <div 
              key={phase.id}
              className="text-xs font-medium text-gray-500 dark:text-gray-400"
            >
              {phase.label}
            </div>
          ))}
        </div>
        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-primary-600 rounded-full w-0"></div>
        </div>
      </div>
    );
  }
  
  // Calculate which phase is active and its progress
  const phaseIndex = phases.findIndex(phase => phase.id === testPhase);
  const phaseWidth = 100 / phases.length;
  
  // Calculate total progress based on completed phases + current phase progress
  const completedPhasesProgress = phaseIndex * phaseWidth;
  const currentPhaseProgress = (progress / 100) * phaseWidth;
  const totalProgress = testPhase === 'complete' 
    ? 100 
    : completedPhasesProgress + currentPhaseProgress;
  
  return (
    <div className="w-full">
      <div className="flex justify-between mb-2">
        {phases.map((phase, index) => {
          // Determine the status of each phase
          const isActive = phase.id === testPhase;
          const isCompleted = phases.findIndex(p => p.id === testPhase) > index;
          
          return (
            <div 
              key={phase.id}
              className={`text-xs font-medium ${
                isActive 
                  ? 'text-primary-600 dark:text-primary-500' 
                  : isCompleted 
                    ? 'text-gray-700 dark:text-gray-300' 
                    : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              {phase.label}
            </div>
          );
        })}
      </div>
      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary-600 dark:bg-primary-500 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${totalProgress}%` }}
        ></div>
      </div>
    </div>
  );
};