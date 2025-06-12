'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Filter } from 'lucide-react';
import { HeaderProps } from '../../types/product';
import { buttonHover, buttonTap } from '../../utils/animations';

export const Header: React.FC<HeaderProps> = ({ onFilterToggle }) => {
  return (
    <motion.header 
      className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-40 shadow-sm shadow-black/5 w-full"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="w-full max-w-none px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 w-full">
          <motion.div 
            className="flex items-center gap-2 sm:gap-4 flex-shrink-0"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <h1 className="text-lg sm:text-xl md:text-2xl font-black text-gray-900 tracking-tight">
              <span className="hidden sm:inline">Product Showcase</span>
              <span className="sm:hidden">Products</span>
            </h1>
          </motion.div>
          
          <motion.button
            onClick={onFilterToggle}
            className="md:hidden p-2 sm:p-3 text-gray-600 hover:text-gray-900 bg-gray-100/50 hover:bg-gray-100 rounded-xl sm:rounded-2xl transition-all duration-300 flex-shrink-0"
            whileHover={buttonHover}
            whileTap={buttonTap}
          >
            <Filter className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
};