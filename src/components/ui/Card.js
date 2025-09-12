'use client';

import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * Enhanced Card Component - International Standards
 * Sophisticated design with glass morphism, gradients, and animations
 */
const Card = forwardRef(({
  className,
  variant = "default",
  size = "default",
  children,
  hover = true,
  animation = "default",
  glass = false,
  gradient = false,
  border = true,
  shadow = "default",
  rounded = "default",
  ...props
}, ref) => {
  // Enhanced card variants
  const cardVariants = {
    default: "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700",
    elevated: "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 shadow-lg",
    outlined: "bg-transparent border-2 border-gray-200 dark:border-gray-700",
    filled: "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700",
    glass: "bg-white/10 backdrop-blur-xl border-white/20",
    gradient: "bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 border-blue-200 dark:border-blue-800"
  };

  // Enhanced size variants
  const sizeVariants = {
    sm: "p-4",
    default: "p-6",
    lg: "p-8",
    xl: "p-10",
    "2xl": "p-12"
  };

  // Enhanced shadow variants
  const shadowVariants = {
    none: "",
    sm: "shadow-sm",
    default: "shadow-md",
    lg: "shadow-lg",
    xl: "shadow-xl",
    "2xl": "shadow-2xl",
    glow: "shadow-glow"
  };

  // Enhanced rounded variants
  const roundedVariants = {
    none: "rounded-none",
    sm: "rounded-md",
    default: "rounded-lg",
    lg: "rounded-xl",
    xl: "rounded-2xl",
    "3xl": "rounded-3xl",
    full: "rounded-full"
  };

  // Enhanced animation variants
  const animationVariants = {
    none: {},
    default: {
      whileHover: hover ? { y: -4, scale: 1.01 } : {},
      whileTap: { scale: 0.98 }
    },
    lift: {
      whileHover: hover ? { y: -8, scale: 1.02 } : {},
      whileTap: { scale: 0.96 }
    },
    scale: {
      whileHover: hover ? { scale: 1.05 } : {},
      whileTap: { scale: 0.95 }
    },
    rotate: {
      whileHover: hover ? { rotate: 2, scale: 1.02 } : {},
      whileTap: { rotate: -2, scale: 0.98 }
    }
  };

  const baseClasses = cn(
    "relative overflow-hidden transition-all duration-300",
    cardVariants[variant],
    sizeVariants[size],
    shadowVariants[shadow],
    roundedVariants[rounded],
    border && "border",
    glass && "backdrop-blur-xl bg-white/10 border-white/20",
    gradient && "bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900",
    className
  );

  return (
    <motion.div
      ref={ref}
      className={baseClasses}
      variants={animationVariants[animation]}
      initial="initial"
      whileHover="whileHover"
      whileTap="whileTap"
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      {...props}
    >
      {/* Enhanced background effects */}
      {glass && (
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 dark:from-black/20 dark:to-black/5" />
      )}

      {gradient && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 via-transparent to-indigo-100/50 dark:from-blue-900/50 dark:to-indigo-900/50" />
      )}

      {/* Content with proper z-index */}
      <div className="relative z-10">
        {children}
      </div>

      {/* Enhanced hover overlay */}
      {hover && (
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />
      )}
    </motion.div>
  );
});

/**
 * Enhanced Card Header Component
 */
const CardHeader = forwardRef(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 pb-4", className)}
    {...props}
  >
    {children}
  </div>
));

/**
 * Enhanced Card Title Component
 */
const CardTitle = forwardRef(({ className, children, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-2xl font-semibold leading-none tracking-tight text-neutral-900 dark:text-white", className)}
    {...props}
  >
    {children}
  </h3>
));

/**
 * Enhanced Card Description Component
 */
const CardDescription = forwardRef(({ className, children, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-neutral-600 dark:text-neutral-400", className)}
    {...props}
  >
    {children}
  </p>
));

/**
 * Enhanced Card Content Component
 */
const CardContent = forwardRef(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("pt-0", className)}
    {...props}
  >
    {children}
  </div>
));

/**
 * Enhanced Card Footer Component
 */
const CardFooter = forwardRef(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center pt-4", className)}
    {...props}
  >
    {children}
  </div>
));

Card.displayName = "Card";
CardHeader.displayName = "CardHeader";
CardTitle.displayName = "CardTitle";
CardDescription.displayName = "CardDescription";
CardContent.displayName = "CardContent";
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
export default Card;