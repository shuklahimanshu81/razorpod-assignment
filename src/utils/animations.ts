import { Variants } from 'framer-motion';

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.8,
    transition: {
      duration: 0.2
    }
  }
};

export const slideInFromRight: Variants = {
  hidden: { opacity: 0, x: 100 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  }
};

export const slideInFromLeft: Variants = {
  hidden: { opacity: 0, x: -100 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  }
};

export const cardHover = {
  y: -12,
  transition: { type: "spring", stiffness: 400, damping: 25 }
};

export const buttonHover = {
  scale: 1.05,
  transition: { type: "spring", stiffness: 400, damping: 17 }
};

export const buttonTap = {
  scale: 0.95
};

export const springConfig = {
  type: "spring" as const,
  stiffness: 300,
  damping: 30
};

export const stiffSpringConfig = {
  type: "spring" as const,
  stiffness: 500,
  damping: 15
};

export const easeOut = [0.4, 0, 0.2, 1];
export const easeInOut = [0.4, 0, 0.6, 1];