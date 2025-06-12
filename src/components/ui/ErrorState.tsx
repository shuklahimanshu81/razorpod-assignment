'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ErrorStateProps } from '@/types/product';
import { staggerContainer, fadeInUp, scaleIn, buttonHover, buttonTap } from '@/utils/animations';

export const ErrorState: React.FC<ErrorStateProps> = ({ error, onRetry }) => {
  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50/50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div 
        className="text-center"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={scaleIn} className="text-red-500 text-6xl mb-4">
          ⚠️
        </motion.div>
        <motion.h2 variants={fadeInUp} className="text-2xl font-bold text-gray-800 mb-2">
          Oops! Something went wrong
        </motion.h2>
        <motion.p variants={fadeInUp} className="text-gray-600 mb-4">
          {error}
        </motion.p>
        <motion.button 
          variants={fadeInUp}
          onClick={onRetry}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
          whileHover={buttonHover}
          whileTap={buttonTap}
        >
          Try Again
        </motion.button>
      </motion.div>
    </motion.div>
  );
};