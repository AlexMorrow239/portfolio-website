// Common transition configurations
export const defaultTransition = {
  duration: 0.6,
  ease: [0.43, 0.13, 0.23, 0.96], // Custom easing
};

export const springTransition = {
  type: 'spring',
  stiffness: 400,
  damping: 30,
} as const;

export const staggerTransition = (
  delay = 0,
): { duration: number; ease: number[]; delay: number } => ({
  ...defaultTransition,
  delay,
});

export const hoverTransition = {
  duration: 0.3,
  ease: 'easeInOut',
};

// Transition presets for specific use cases
export const pageTransition = {
  ...defaultTransition,
  duration: 0.8,
};

export const menuTransition = {
  ...springTransition,
  stiffness: 300,
  damping: 25,
};

export const buttonTransition = {
  duration: 0.2,
  ease: 'easeOut',
};
