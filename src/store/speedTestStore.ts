import { create } from 'zustand';
import { SpeedTestState } from '../types';
import { simulateSpeedTest } from '../utils/speedTestUtils';

export const useSpeedTestStore = create<SpeedTestState>((set, get) => ({
  isTestRunning: false,
  testPhase: 'idle',
  progress: 0,
  results: {
    ping: null,
    download: null,
    upload: null,
  },
  
  startTest: async () => {
    set({ 
      isTestRunning: true, 
      testPhase: 'ping', 
      progress: 0,
      results: {
        ping: null,
        download: null,
        upload: null,
      }
    });

    try {
      // Ping test
      const pingResult = await simulateSpeedTest('ping', (progress) => {
        set({ progress });
      });
      set({ results: { ...get().results, ping: pingResult }, testPhase: 'download', progress: 0 });

      // Download test
      const downloadResult = await simulateSpeedTest('download', (progress) => {
        set({ progress });
      });
      set({ results: { ...get().results, download: downloadResult }, testPhase: 'upload', progress: 0 });

      // Upload test
      const uploadResult = await simulateSpeedTest('upload', (progress) => {
        set({ progress });
      });
      set({ 
        results: { ...get().results, upload: uploadResult },
        testPhase: 'complete',
        progress: 100,
        isTestRunning: false
      });
    } catch (error) {
      console.error('Speed test failed:', error);
      set({ isTestRunning: false, testPhase: 'idle' });
    }
  },

  stopTest: () => {
    set({ isTestRunning: false, testPhase: 'idle' });
  },

  resetTest: () => {
    set({
      isTestRunning: false,
      testPhase: 'idle',
      progress: 0,
      results: {
        ping: null,
        download: null,
        upload: null,
      }
    });
  }
}));