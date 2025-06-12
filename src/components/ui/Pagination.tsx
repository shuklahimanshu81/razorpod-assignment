'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PaginationProps } from '@/types/product';
import { buttonHover, buttonTap } from '@/utils/animations';

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
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= maxVisible; i++) {
          pages.push(i);
        }
      } else if (currentPage >= totalPages - 2) {
        for (let i = totalPages - maxVisible + 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pages.push(i);
        }
      }
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  if (totalPages <= 1) return null;

  return (
    <>
      <motion.div 
        className="flex justify-between items-center mb-8 px-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="text-gray-600 font-medium">
          <span className="text-gray-900 font-bold">{startResult}-{endResult}</span> of{' '}
          <span className="text-gray-900 font-bold">{totalProducts}</span> products
        </div>
        <div className="text-sm text-gray-500 bg-gray-100/50 px-3 py-1.5 rounded-full">
          Page {currentPage} of {totalPages}
        </div>
      </motion.div>

      <motion.div 
        className="flex justify-center items-center gap-3"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <motion.button
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className="flex items-center gap-3 px-6 py-3 bg-white/70 backdrop-blur-xl border border-gray-200/50 rounded-2xl disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white/90 hover:border-gray-300/70 transition-all duration-300 font-semibold text-gray-700 shadow-lg shadow-black/5"
          whileHover={currentPage !== 1 ? { ...buttonHover, x: -2 } : {}}
          whileTap={currentPage !== 1 ? buttonTap : {}}
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </motion.button>
        
        <div className="flex gap-2">
          {pageNumbers.map((pageNum) => (
            <motion.button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`w-12 h-12 rounded-2xl font-bold transition-all duration-300 shadow-lg ${
                currentPage === pageNum
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-blue-500/25'
                  : 'bg-white/70 backdrop-blur-xl text-gray-700 border border-gray-200/50 hover:bg-white/90 hover:border-gray-300/70 shadow-black/5'
              }`}
              whileHover={{ scale: 1.1, y: -2 }}
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
          className="flex items-center gap-3 px-6 py-3 bg-white/70 backdrop-blur-xl border border-gray-200/50 rounded-2xl disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white/90 hover:border-gray-300/70 transition-all duration-300 font-semibold text-gray-700 shadow-lg shadow-black/5"
          whileHover={currentPage !== totalPages ? { ...buttonHover, x: 2 } : {}}
          whileTap={currentPage !== totalPages ? buttonTap : {}}
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </motion.button>
      </motion.div>
    </>
  );
};