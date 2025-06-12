'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { LoadingSpinnerProps } from '@/types/product';
import { staggerContainer, fadeInUp } from '@/utils/animations';
import { MESSAGES } from '@/constants';

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = MESSAGES.LOADING 
}) => {
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
        <motion.div variants={fadeInUp}>
          <Loader2 className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
        </motion.div>
        <motion.p variants={fadeInUp} className="text-gray-600 font-medium">
          {message}
        </motion.p>
      </motion.div>
    </motion.div>
  );
};