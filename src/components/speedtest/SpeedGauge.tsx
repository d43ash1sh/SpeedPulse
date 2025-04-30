import React, { useMemo } from 'react';
import { twMerge } from 'tailwind-merge';

interface SpeedGaugeProps {
  value: number | null;
  maxValue: number;
  label: string;
  unit: string;
  quality?: 'excellent' | 'good' | 'fair' | 'poor';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  isAnimated?: boolean;
}

export const SpeedGauge: React.FC<SpeedGaugeProps> = ({
  value,
  maxValue,
  label,
  unit,
  quality = 'good',
  size = 'md',
  className,
  isAnimated = true,
}) => {
  const radius = useMemo(() => {
    switch (size) {
      case 'sm': return 40;
      case 'lg': return 80;
      default: return 60;
    }
  }, [size]);
  
  const strokeWidth = useMemo(() => {
    switch (size) {
      case 'sm': return 5;
      case 'lg': return 10;
      default: return 8;
    }
  }, [size]);
  
  const gaugeSize = useMemo(() => {
    switch (size) {
      case 'sm': return 'w-24 h-24';
      case 'lg': return 'w-48 h-48';
      default: return 'w-36 h-36';
    }
  }, [size]);
  
  const fontSize = useMemo(() => {
    switch (size) {
      case 'sm': return 'text-lg';
      case 'lg': return 'text-4xl';
      default: return 'text-2xl';
    }
  }, [size]);
  
  const labelSize = useMemo(() => {
    switch (size) {
      case 'sm': return 'text-xs';
      case 'lg': return 'text-lg';
      default: return 'text-sm';
    }
  }, [size]);
  
  const qualityColors = {
    excellent: 'stroke-success-500',
    good: 'stroke-primary-500',
    fair: 'stroke-warning-500',
    poor: 'stroke-error-500',
  };
  
  const circumference = 2 * Math.PI * radius;
  const progress = value !== null ? (value / maxValue) * 100 : 0;
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  
  return (
    <div className={twMerge('relative', gaugeSize, className)}>
      <svg
        className="w-full h-full transform -rotate-90"
        viewBox={`0 0 ${radius * 2 + strokeWidth * 2} ${radius * 2 + strokeWidth * 2}`}
      >
        {/* Background circle */}
        <circle
          cx={radius + strokeWidth}
          cy={radius + strokeWidth}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="stroke-gray-200 dark:stroke-gray-700"
        />
        
        {/* Progress circle */}
        <circle
          cx={radius + strokeWidth}
          cy={radius + strokeWidth}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className={`${qualityColors[quality]} ${isAnimated ? 'transition-all duration-1000 ease-out' : ''}`}
        />
      </svg>
      
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className={`font-bold ${fontSize}`}>
          {value !== null ? value.toFixed(1) : '0'}
        </div>
        <div className={`${labelSize} text-gray-500 dark:text-gray-400`}>
          {unit}
        </div>
        <div className={`mt-1 font-medium ${labelSize}`}>
          {label}
        </div>
      </div>
    </div>
  );
};