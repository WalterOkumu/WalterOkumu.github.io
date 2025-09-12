'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import Badge from './Badge';

/**
 * Professional Timeline Component
 * For displaying career progression and project history
 */

// Timeline Item Component
const TimelineItem = forwardRef(({
  title,
  company,
  period,
  location,
  description,
  achievements = [],
  technologies = [],
  isLast = false,
  className = '',
  // Filter out non-DOM props
  executiveLevel,
  revenueImpact,
  teamSize,
  countries,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn('relative pb-8 timeline-item', !isLast && 'border-l-2 border-neutral-200 dark:border-neutral-800 ml-4', className)}
      {...props}
    >
      {/* Timeline Dot */}
      <div className="absolute -left-[9px] top-0">
        <div className="w-4 h-4 bg-primary-600 rounded-full border-4 border-neutral-50 dark:border-neutral-950"></div>
      </div>

      {/* Content */}
      <div className="ml-8">
        {/* Header */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
            {title}
          </h3>
          {company && (
            <div className="text-lg font-medium text-primary-600 dark:text-primary-400 mb-1">
              {company}
            </div>
          )}
          <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-600 dark:text-neutral-400">
            <span className="flex items-center">
              <CalendarIcon className="w-4 h-4 mr-1" />
              {period}
            </span>
            {location && (
              <span className="flex items-center">
                <LocationIcon className="w-4 h-4 mr-1" />
                {location}
              </span>
            )}
          </div>
        </div>

        {/* Description */}
        {description && (
          <div className="text-neutral-700 dark:text-neutral-300 mb-4">
            {Array.isArray(description) ? (
              <ul className="list-disc list-inside space-y-1">
                {description.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            ) : (
              <p>{description}</p>
            )}
          </div>
        )}

        {/* Achievements */}
        {achievements.length > 0 && (
          <div className="mb-4 timeline-achievements-list">
            <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
              Key Achievements
            </h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-neutral-700 dark:text-neutral-300">
              {achievements.map((achievement, index) => (
                <li key={index}>{achievement}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Executive Stats */}
        {(teamSize || countries || revenueImpact) && (
          <div className="mb-4 timeline-stats-list">
            <div className="flex flex-wrap gap-3 text-sm">
              {teamSize && (
                <span className="px-2 py-1 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">
                  {teamSize}
                </span>
              )}
              {countries && (
                <span className="px-2 py-1 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">
                  {countries}
                </span>
              )}
              {revenueImpact && (
                <span className="px-2 py-1 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">
                  {revenueImpact}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Technologies */}
        {technologies.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, index) => (
              <Badge key={index} size="sm" variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
});

// Main Timeline Component
const Timeline = forwardRef(({
  children,
  className = '',
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn('relative', className)}
      {...props}
    >
      {children}
    </div>
  );
});

// Professional Timeline with predefined data structure
const ProfessionalTimeline = forwardRef(({
  experiences = [],
  className = '',
  ...props
}, ref) => {
  return (
    <Timeline ref={ref} className={className} {...props}>
      {experiences.map((experience, index) => (
        <TimelineItem
          key={index}
          {...experience}
          isLast={index === experiences.length - 1}
        />
      ))}
    </Timeline>
  );
});

// Icon Components
const CalendarIcon = ({ className = '' }) => (
  <svg
    className={cn('w-4 h-4', className)}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

const LocationIcon = ({ className = '' }) => (
  <svg
    className={cn('w-4 h-4', className)}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

// Set display names
Timeline.displayName = 'Timeline';
TimelineItem.displayName = 'TimelineItem';
ProfessionalTimeline.displayName = 'ProfessionalTimeline';

export { Timeline, TimelineItem, ProfessionalTimeline };
export default Timeline;
