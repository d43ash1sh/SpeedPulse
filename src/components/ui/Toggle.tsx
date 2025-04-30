import React from 'react';
import { twMerge } from 'tailwind-merge';

interface ToggleProps {
  isEnabled: boolean;
  onChange: () => void;
  label?: string;
  className?: string;
}

export const Toggle: React.FC<ToggleProps> = ({
  isEnabled,
  onChange,
  label,
  className,
}) => {
  return (
    <div className={twMerge('flex items-center', className)}>
      {label && (
        <span className="mr-3 text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </span>
      )}
      <button
        type="button"
        onClick={onChange}
        className={`
          relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent 
          transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
          ${isEnabled ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'}
        `}
        role="switch"
        aria-checked={isEnabled}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={`
            pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 
            transition duration-200 ease-in-out
            ${isEnabled ? 'translate-x-5' : 'translate-x-0'}
          `}
        />
      </button>
    </div>
  );
};