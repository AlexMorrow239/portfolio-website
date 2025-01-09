import { defaultTransition, springTransition } from '@/utils/animations/transitions';

export const heroVariants = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  },

  item: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: defaultTransition,
    },
  },

  circle: {
    hidden: { opacity: 0, scale: 0 },
    visible: (delay: number) => ({
      opacity: 0.1,
      scale: 1,
      transition: {
        ...springTransition,
        delay,
      },
    }),
  },

  scrollIndicator: {
    animate: {
      y: [0, 10, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  },
};

export const skillsVariants = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  },

  card: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: defaultTransition,
    },
  },
};
