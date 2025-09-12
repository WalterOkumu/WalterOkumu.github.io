'use client';

import { forwardRef, useId } from 'react';
import { cn } from '@/lib/utils';

/**
 * Professional Progress Bar Component
 * For visualizing skill levels and progress indicators
 */

// Progress Bar variants
const progressVariants = {
  variant: {
    default: 'bg-primary-600',
    success: 'bg-success-DEFAULT',
    warning: 'bg-warning-DEFAULT',
    error: 'bg-error-DEFAULT',
    secondary: 'bg-neutral-600',
  },
  size: {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
    xl: 'h-6',
  },
};

// Main Progress Bar Component
const ProgressBar = forwardRef(({
  value = 0,
  max = 100,
  className = '',
  variant = 'default',
  size = 'md',
  showValue = false,
  label = '',
  animated = false,
  ...props
}, ref) => {
  const reactId = useId();
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div ref={ref} className={cn('w-full', className)} {...props}>
      {/* Label and Value */}
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-2">
          {label && (
            <span
              className="text-sm font-medium text-neutral-700 dark:text-neutral-300"
              id={`progress-label-${reactId}`}
            >
              {label}
            </span>
          )}
          {showValue && (
            <span className="text-sm text-neutral-600 dark:text-neutral-400">
              {value}{max === 100 ? '%' : `/${max}`}
            </span>
          )}
        </div>
      )}

      {/* Progress Bar Container */}
      <div
        className={cn(
          'w-full bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden',
          progressVariants.size[size]
        )}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label || `Progress: ${percentage}%`}
      >
        {/* Progress Bar Fill */}
        <div
          className={cn(
            'h-full rounded-full transition-all duration-500 ease-out',
            progressVariants.variant[variant],
            animated && 'animate-pulse'
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
});

// Skill Progress Component (specialized for skills visualization)
const SkillProgress = forwardRef(({
  skill,
  level,
  experience = '',
  description = '',
  className = '',
  showlabel = false.toString(),
  ...props
}, ref) => {
  const getVariantFromLevel = (level) => {
    if (level >= 90) return 'success';
    if (level >= 75) return 'default';
    if (level >= 60) return 'warning';
    return 'secondary';
  };

  const getLevelLabel = (level) => {
    if (level >= 90) return 'Expert';
    if (level >= 75) return 'Advanced';
    if (level >= 60) return 'Intermediate';
    return 'Beginner';
  };

  return (
    <div ref={ref} className={cn('space-y-2', className)} {...props}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
          {skill}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            {getLevelLabel(level)}
          </span>
          {experience && (
            <span className="text-xs text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded">
              {experience}
            </span>
          )}
        </div>
      </div>

      <ProgressBar
        value={level}
        variant={getVariantFromLevel(level)}
        size="lg"
        showValue
        showlabel={showlabel}
      />

      {description && (
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {description}
        </p>
      )}
    </div>
  );
});

// Circular Progress Component
const CircularProgress = forwardRef(({
  value = 0,
  max = 100,
  size = 120,
  strokeWidth = 8,
  className = '',
  variant = 'default',
  showValue = true,
  label = '',
  ...props
}, ref) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const colors = {
    default: 'text-primary-600',
    success: 'text-success-DEFAULT',
    warning: 'text-warning-DEFAULT',
    error: 'text-error-DEFAULT',
    secondary: 'text-neutral-600',
  };

  return (
    <div
      ref={ref}
      className={cn('flex flex-col items-center', className)}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={label || `Circular progress: ${Math.round(percentage)}%`}
      {...props}
    >
      <div className="relative">
        <svg
          width={size}
          height={size}
          className="transform -rotate-90"
          aria-hidden="true"
        >
          {/* Background Circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            className="text-neutral-200 dark:text-neutral-700"
          />
          {/* Progress Circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className={cn('transition-all duration-500 ease-out', colors[variant])}
            strokeLinecap="round"
          />
        </svg>

        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {showValue && (
            <span
              className="text-2xl font-bold text-neutral-900 dark:text-neutral-100"
              aria-live="polite"
            >
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      </div>

      {label && (
        <span className="mt-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 text-center">
          {label}
        </span>
      )}
    </div>
  );
});

// Set display names
ProgressBar.displayName = 'ProgressBar';
SkillProgress.displayName = 'SkillProgress';
CircularProgress.displayName = 'CircularProgress';

export { ProgressBar, SkillProgress, CircularProgress };
export default ProgressBar;