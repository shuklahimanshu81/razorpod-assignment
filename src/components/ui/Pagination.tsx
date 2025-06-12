'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PaginationProps } from '../../types/product';

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  startResult,
  endResult,
  totalProducts
}) => {
  const getPageNumbers = () => {
    const pages = [];
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
    const maxVisible = isMobile ? 3 : 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const halfVisible = Math.floor(maxVisible / 2);
      let start = Math.max(1, currentPage - halfVisible);
      const end = Math.min(totalPages, start + maxVisible - 1);
      
      if (end === totalPages) {
        start = Math.max(1, end - maxVisible + 1);
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  if (totalPages <= 1) return null;

  return (
    <div className="w-full max-w-full overflow-hidden px-4">
      <motion.div 
        className="text-center mb-4 md:flex md:justify-between md:items-center md:mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="text-xs sm:text-sm md:text-base text-gray-600 font-medium mb-2 md:mb-0">
          <span className="text-gray-900 font-bold">{startResult}-{endResult}</span> of{' '}
          <span className="text-gray-900 font-bold">{totalProducts}</span> products
        </div>
        <div className="text-xs sm:text-sm text-gray-500 bg-gray-100/50 px-2 py-1 rounded-full inline-block">
          Page {currentPage} of {totalPages}
        </div>
      </motion.div>

      <motion.div 
        className="flex justify-center items-center gap-1 w-full max-w-full"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <motion.button
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className="flex items-center justify-center w-8 h-8 bg-white/70 backdrop-blur-xl border border-gray-200/50 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white/90 hover:border-gray-300/70 transition-all duration-300 text-gray-700 shadow-md flex-shrink-0"
          whileHover={currentPage !== 1 ? { scale: 1.05 } : {}}
          whileTap={currentPage !== 1 ? { scale: 0.95 } : {}}
        >
          <ChevronLeft className="w-4 h-4" />
        </motion.button>
        
        <div className="flex gap-1 mx-2 justify-center">
          {pageNumbers.map((pageNum) => (
            <motion.button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`w-8 h-8 rounded-lg font-bold transition-all duration-300 shadow-md text-sm flex-shrink-0 ${
                currentPage === pageNum
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-blue-500/25'
                  : 'bg-white/70 backdrop-blur-xl text-gray-700 border border-gray-200/50 hover:bg-white/90 hover:border-gray-300/70 shadow-black/5'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: pageNum * 0.05 }}
            >
              {pageNum}
            </motion.button>
          ))}
        </div>
        
        <motion.button
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="flex items-center justify-center w-8 h-8 bg-white/70 backdrop-blur-xl border border-gray-200/50 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white/90 hover:border-gray-300/70 transition-all duration-300 text-gray-700 shadow-md flex-shrink-0"
          whileHover={currentPage !== totalPages ? { scale: 1.05 } : {}}
          whileTap={currentPage !== totalPages ? { scale: 0.95 } : {}}
        >
          <ChevronRight className="w-4 h-4" />
        </motion.button>
      </motion.div>
    </div>
  );
};