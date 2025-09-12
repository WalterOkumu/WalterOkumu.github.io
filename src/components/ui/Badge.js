'use client';

import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * Enhanced Badge Component - International Standards
 * Sophisticated design with animations and accessibility
 */
const Badge = forwardRef(({
  className,
  variant = "default",
  size = "default",
  children,
  icon,
  iconPosition = "left",
  rounded = "default",
  animation = "default",
  pulse = false,
  glow = false,
  ...props
}, ref) => {
  // Enhanced badge variants
  const badgeVariants = {
    default: "bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200",
    primary: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    secondary: "bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200",
    success: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    error: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    info: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    executive: "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg",
    glass: "bg-white/10 backdrop-blur-md border border-white/20 text-white",
    outline: "border border-neutral-200 text-neutral-700 dark:border-neutral-700 dark:text-neutral-300"
  };

  // Enhanced size variants
  const sizeVariants = {
    sm: "px-2 py-1 text-xs",
    default: "px-2.5 py-1 text-sm",
    lg: "px-3 py-1.5 text-base",
    xl: "px-4 py-2 text-lg"
  };

  // Enhanced rounded variants
  const roundedVariants = {
    none: "rounded-none",
    sm: "rounded",
    default: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    full: "rounded-full"
  };

  // Enhanced animation variants
  const animationVariants = {
    none: {},
    default: {
      whileHover: { scale: 1.05 },
      whileTap: { scale: 0.95 }
    },
    bounce: {
      whileHover: { scale: 1.1, y: -2 },
      whileTap: { scale: 0.9 }
    },
    rotate: {
      whileHover: { rotate: 5, scale: 1.05 },
      whileTap: { rotate: -5, scale: 0.95 }
    }
  };

  const baseClasses = cn(
    "inline-flex items-center gap-1.5 font-medium transition-all duration-200",
    badgeVariants[variant],
    sizeVariants[size],
    roundedVariants[rounded],
    pulse && "animate-pulse",
    glow && "shadow-glow",
    className
  );

  // Enhanced content with icon support
  const renderContent = () => {
    if (icon && iconPosition === "left") {
      return (
        <>
          <span className="flex-shrink-0">{icon}</span>
          {children}
        </>
      );
    }

    if (icon && iconPosition === "right") {
      return (
        <>
          {children}
          <span className="flex-shrink-0">{icon}</span>
        </>
      );
    }

    return children;
  };

  return (
    <motion.span
      ref={ref}
      className={baseClasses}
      variants={animationVariants[animation]}
      initial="initial"
      whileHover="whileHover"
      whileTap="whileTap"
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      {...props}
    >
      {renderContent()}
    </motion.span>
  );
});

/**
 * Enhanced Status Badge Component
 */
const StatusBadge = forwardRef(({
  status = "default",
  className,
  children,
  ...props
}, ref) => {
  const statusVariants = {
    default: "bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200",
    active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    inactive: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    completed: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    draft: "bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200",
    published: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    archived: "bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200"
  };

  return (
    <Badge
      ref={ref}
      variant={statusVariants[status] ? "default" : "default"}
      className={cn(statusVariants[status], className)}
      {...props}
    >
      {children || status}
    </Badge>
  );
});

/**
 * Enhanced Metric Badge Component
 */
const MetricBadge = forwardRef(({
  value,
  label,
  trend = "neutral",
  className,
  ...props
}, ref) => {
  const trendVariants = {
    positive: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    negative: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    neutral: "bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200"
  };

  const trendIcons = {
    positive: "↗",
    negative: "↘",
    neutral: "→"
  };

  return (
    <Badge
      ref={ref}
      className={cn(trendVariants[trend], className)}
      {...props}
    >
      <span className="font-bold">{value}</span>
      <span className="text-xs opacity-75">{label}</span>
      <span className="text-xs">{trendIcons[trend]}</span>
    </Badge>
  );
});

/**
 * Enhanced Notification Badge Component
 */
const NotificationBadge = forwardRef(({
  count,
  max = 99,
  className,
  children,
  ...props
}, ref) => {
  const displayCount = count > max ? `${max}+` : count;

  return (
    <div className="relative inline-block">
      {children}
      {count > 0 && (
        <motion.span
          ref={ref}
          className={cn(
            "absolute -top-2 -right-2 min-w-[20px] h-5 px-1.5",
            "bg-red-500 text-white text-xs font-bold rounded-full",
            "flex items-center justify-center",
            "animate-pulse",
            className
          )}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          {...props}
        >
          {displayCount}
        </motion.span>
      )}
    </div>
  );
});

Badge.displayName = "Badge";
StatusBadge.displayName = "StatusBadge";
MetricBadge.displayName = "MetricBadge";
NotificationBadge.displayName = "NotificationBadge";

export { Badge, StatusBadge, MetricBadge, NotificationBadge };
export default Badge;