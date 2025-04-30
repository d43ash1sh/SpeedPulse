/**
 * This is a simulation of speed testing for demo purposes.
 * In a real application, you would implement actual network testing.
 */

const SIMULATION_DURATION = {
  ping: 2000,
  download: 8000,
  upload: 6000
};

const RANDOM_RANGES = {
  ping: { min: 8, max: 150 },
  download: { min: 5, max: 250 },
  upload: { min: 3, max: 100 }
};

export function getRandomInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function simulateSpeedTest(
  type: 'ping' | 'download' | 'upload',
  onProgress: (progress: number) => void
): Promise<number> {
  return new Promise((resolve) => {
    const duration = SIMULATION_DURATION[type];
    const startTime = Date.now();
    const range = RANDOM_RANGES[type];
    
    // For realistic simulation, start with lower values and gradually increase
    let currentValue = range.min;
    const maxValue = getRandomInRange(range.min, range.max);
    
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min((elapsed / duration) * 100, 100);
      
      // Update progress callback
      onProgress(progress);
      
      // Gradually approach the max value
      if (type === 'ping') {
        // For ping, we want to start high and get lower (better)
        currentValue = range.max - (progress / 100) * (range.max - maxValue);
      } else {
        // For download/upload, gradually increase speed
        currentValue = range.min + (progress / 100) * (maxValue - range.min);
      }
      
      // If test completed
      if (progress >= 100) {
        clearInterval(interval);
        resolve(Number(currentValue.toFixed(1)));
      }
    }, 100);
  });
}

export function formatSpeed(speed: number | null): string {
  if (speed === null) return '0 Mbps';
  return `${speed.toFixed(1)} Mbps`;
}

export function formatPing(ping: number | null): string {
  if (ping === null) return '0 ms';
  return `${ping.toFixed(0)} ms`;
}

export function getPingQuality(ping: number | null): 'excellent' | 'good' | 'fair' | 'poor' {
  if (ping === null) return 'poor';
  if (ping < 20) return 'excellent';
  if (ping < 50) return 'good';
  if (ping < 100) return 'fair';
  return 'poor';
}

export function getSpeedQuality(speed: number | null, type: 'download' | 'upload'): 'excellent' | 'good' | 'fair' | 'poor' {
  if (speed === null) return 'poor';
  
  if (type === 'download') {
    if (speed > 100) return 'excellent';
    if (speed > 50) return 'good';
    if (speed > 20) return 'fair';
    return 'poor';
  } else {
    if (speed > 50) return 'excellent';
    if (speed > 20) return 'good';
    if (speed > 10) return 'fair';
    return 'poor';
  }
}

export function getQualityColor(quality: 'excellent' | 'good' | 'fair' | 'poor'): string {
  switch (quality) {
    case 'excellent': return 'text-success-500';
    case 'good': return 'text-primary-500';
    case 'fair': return 'text-warning-500';
    case 'poor': return 'text-error-500';
    default: return 'text-gray-500';
  }
}

export function getBrowserInfo(): string {
  const userAgent = navigator.userAgent;
  let browserName = "Unknown";
  
  if (userAgent.indexOf("Firefox") > -1) {
    browserName = "Firefox";
  } else if (userAgent.indexOf("SamsungBrowser") > -1) {
    browserName = "Samsung Internet";
  } else if (userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1) {
    browserName = "Opera";
  } else if (userAgent.indexOf("Trident") > -1) {
    browserName = "Internet Explorer";
  } else if (userAgent.indexOf("Edge") > -1) {
    browserName = "Edge";
  } else if (userAgent.indexOf("Chrome") > -1) {
    browserName = "Chrome";
  } else if (userAgent.indexOf("Safari") > -1) {
    browserName = "Safari";
  }
  
  return browserName;
}

export function getDeviceInfo(): string {
  const userAgent = navigator.userAgent;
  
  if (/Android/i.test(userAgent)) {
    return "Android";
  } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
    return "iOS";
  } else if (/Windows/i.test(userAgent)) {
    return "Windows";
  } else if (/Mac/i.test(userAgent)) {
    return "Mac";
  } else if (/Linux/i.test(userAgent)) {
    return "Linux";
  }
  
  return "Unknown";
}